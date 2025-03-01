(eval-and-compile

  (defmacro xcond (&rest clauses)
    "Exhaustive COND.
Signal an error if no clause matches."
    `(cond ,@clauses
           (t (error "XCOND lost."))))

  (defalias 'paredit-warn (if (fboundp 'warn) 'warn 'message))

  (defvar paredit-sexp-error-type
    (with-temp-buffer
      (insert "(")
      (condition-case condition
          (backward-sexp)
        (error (if (eq (car condition) 'error)
                   (paredit-warn "%s%s%s%s%s"
                                 "Paredit is unable to discriminate"
                                 " S-expression parse errors from"
                                 " other errors. "
                                 " This may cause obscure problems. "
                                 " Please upgrade Emacs."))
               (car condition)))))

  (defmacro paredit-handle-sexp-errors (body &rest handler)
    `(condition-case ()
         ,body
       (,paredit-sexp-error-type ,@handler)))

  (put 'paredit-handle-sexp-errors 'lisp-indent-function 1)

  (defmacro paredit-ignore-sexp-errors (&rest body)
    `(paredit-handle-sexp-errors (progn ,@body)
       nil))

  (put 'paredit-ignore-sexp-errors 'lisp-indent-function 0)

  nil)
(defun paredit-in-string-escape-p ()
  "True if the point is on a character escape of a string.
This is true only if the character is preceded by an odd number of
  backslashes.
This assumes that `paredit-in-string-p' has already returned true."
  (let ((oddp nil))
    (save-excursion
      (while (eq (char-before) ?\\ )
        (setq oddp (not oddp))
        (backward-char)))
    oddp))

(defun paredit-in-char-p (&optional position)
  "True if point is on a character escape outside a string."
  (save-excursion
    (goto-char (or position (point)))
    (paredit-in-string-escape-p)))

;; the following routines redundantly traverse S-expressions a great deal.
;; If performance issues arise, this whole section will probably have
;; to be refactored to preserve the state longer, like paredit.scm
;; does, rather than to traverse the definition N times for every key
;; stroke as it presently does.

(defun paredit-current-parse-state ()
  "Return parse state of point from beginning of defun."
  (let ((point (point)))
    (beginning-of-defun)
    ;; Calling PARSE-PARTIAL-SEXP will advance the point to its second
    ;; argument (unless parsing stops due to an error, but we assume it
    ;; won't in paredit-mode).
    (parse-partial-sexp (point) point)))

(defun paredit-in-string-p (&optional state)
  "True if the parse state is within a double-quote-delimited string.
If no parse state is supplied, compute one from the beginning of the
  defun to the point."
  ;; 3. non-nil if inside a string (the terminator character, really)
  (and (nth 3 (or state (paredit-current-parse-state)))
       t))

(defun paredit-string-start+end-points (&optional state)
  "Return a cons of the points of open and close quotes of the string.
The string is determined from the parse state STATE, or the parse state
  from the beginning of the defun to the point.
This assumes that `paredit-in-string-p' has already returned true, i.e.
  that the point is already within a string."
  (save-excursion
    ;; 8. character address of start of comment or string; nil if not
    ;;    in one
    (let ((start (nth 8 (or state (paredit-current-parse-state)))))
      (goto-char start)
      (forward-sexp 1)
      (cons start (1- (point))))))

(defun paredit-in-comment-p (&optional state)
  "True if parse state STATE is within a comment.
If no parse state is supplied, compute one from the beginning of the
  defun to the point."
  ;; 4. nil if outside a comment, t if inside a non-nestable comment,
  ;;    else an integer (the current comment nesting)
  (and (nth 4 (or state (paredit-current-parse-state)))
       t))

(defun paredit-point-at-sexp-boundary (n)
  (cond ((< n 0) (paredit-point-at-sexp-start))
        ((= n 0) (point))
        ((> n 0) (paredit-point-at-sexp-end))))

(defun paredit-point-at-sexp-start ()
  (save-excursion
    (forward-sexp)
    (backward-sexp)
    (point)))

(defun paredit-point-at-sexp-end ()
  (save-excursion
    (backward-sexp)
    (forward-sexp)
    (point)))

(defun paredit-lose-if-not-in-sexp (command)
  (if (or (paredit-in-string-p)
          (paredit-in-comment-p)
          (paredit-in-char-p))
      (error "Invalid context for command `%s'." command)))

(defun paredit-check-region (start end)
  "Signal an error if text between `start' and `end' is unbalanced."
  ;; `narrow-to-region' will move the point, so avoid calling it if we
  ;; don't need to.  We don't want to use `save-excursion' because we
  ;; want the point to move if `check-parens' reports an error.
  (if (not (paredit-region-ok-p start end))
      (save-restriction
        (narrow-to-region start end)
        (check-parens))))

(defun paredit-region-ok-p (start end)
  "Return true iff the region between `start' and `end' is balanced.
This is independent of context -- it doesn't check what state the
  text at `start' is in."
  (save-excursion
    (paredit-handle-sexp-errors
        (progn
          (save-restriction
            (narrow-to-region start end)
            (scan-sexps (point-min) (point-max)))
          t)
      nil)))

(defun paredit-current-indentation ()
  (save-excursion
    (back-to-indentation)
    (current-column)))
(defun paredit-forward-slurp-sexp ()
  "Add the S-expression following the current list into that list
  by moving the closing delimiter.
Automatically reindent the newly slurped S-expression with respect to
  its new enclosing form.
If in a string, move the opening double-quote forward by one
  S-expression and escape any intervening characters as necessary,
  without altering any indentation or formatting."
  (interactive)
  (save-excursion
    (cond ;; ((or (paredit-in-comment-p)
          ;;      (paredit-in-char-p))
          ;;  (error "Invalid context for slurping S-expressions."))
          ((paredit-in-string-p)
           (paredit-forward-slurp-into-string))
          (t
           (paredit-forward-slurp-into-list)))))

(defun paredit-forward-slurp-into-list ()
  (up-list)                             ; Up to the end of the list to
  (let ((close (char-before)))          ;   save and delete the closing
    (backward-delete-char 1)            ;   delimiter.
    (let ((start (point)))
      (catch 'return                    ; Go to the end of the desired
        (while t                        ;   S-expression, going up a
          (paredit-handle-sexp-errors   ;   list if it's not in this,
              (progn (forward-sexp) (throw 'return nil))
            (up-list)
            (setq close                 ; adjusting for mixed
                  (prog1 (char-before)  ;   delimiters as necessary,
                    (backward-delete-char 1)
                    (insert close))))))
      (insert close)                    ; to insert that delimiter.
      (indent-region start (point) nil))))

(defun paredit-forward-slurp-into-string ()
  (goto-char (1+ (cdr (paredit-string-start+end-points))))
  ;; Signal any errors that we might get first, before mucking with the
  ;; buffer's contents.
  (save-excursion (forward-sexp))
  (let ((close (char-before)))
    (backward-delete-char 1)
    (paredit-forward-for-quote (save-excursion (forward-sexp) (point)))
    (insert close)))

(defun paredit-forward-barf-sexp ()
  "Remove the last S-expression in the current list from that list
  by moving the closing delimiter.
Automatically reindent the newly barfed S-expression with respect to
  its new enclosing form."
  (interactive)
  (paredit-lose-if-not-in-sexp 'paredit-forward-barf-sexp)
  (save-excursion
    (up-list)                           ; Up to the end of the list to
    (let ((close (char-before)))        ;   save and delete the closing
      (backward-delete-char 1)          ;   delimiter.
      (paredit-ignore-sexp-errors       ; Go back to where we want to
        (backward-sexp))                ;   insert the delimiter.
      (paredit-skip-whitespace nil)     ; Skip leading whitespace.
      (cond ((bobp)
             (error "Barfing all subexpressions with no open-paren?"))
            ((paredit-in-comment-p)     ; Don't put the close-paren in
             (newline)))                ;   a comment.
      (insert close))
    ;; Reindent all of the newly barfed S-expressions.
    (paredit-forward-and-indent)))

(defun paredit-backward-slurp-sexp ()
  "Add the S-expression preceding the current list into that list
  by moving the closing delimiter.
Automatically reindent the whole form into which new S-expression was
  slurped.
If in a string, move the opening double-quote backward by one
  S-expression and escape any intervening characters as necessary,
  without altering any indentation or formatting."
  (interactive)
  (save-excursion
    (cond ((or (paredit-in-comment-p)
               (paredit-in-char-p))
           (error "Invalid context for slurping S-expressions."))
          ((paredit-in-string-p)
           (paredit-backward-slurp-into-string))
          (t
           (paredit-backward-slurp-into-list)))))

(defun paredit-backward-slurp-into-list ()
  (backward-up-list)
  (let ((open (char-after)))
    (delete-char 1)
    (catch 'return
      (while t
        (paredit-handle-sexp-errors
            (progn (backward-sexp) (throw 'return nil))
          (backward-up-list)
          (setq open
                (prog1 (char-after)
                  (save-excursion (insert open) (delete-char 1)))))))
    (insert open))
  ;; Reindent the line at the beginning of wherever we inserted the
  ;; opening delimiter, and then indent the whole S-expression.
  (backward-up-list)
  (lisp-indent-line)
  (indent-sexp))

(defun paredit-backward-slurp-into-string ()
  (goto-char (car (paredit-string-start+end-points)))
  ;; Signal any errors that we might get first, before mucking with the
  ;; buffer's contents.
  (save-excursion (backward-sexp))
  (let ((open (char-after))
        (target (point)))
    (delete-char 1)
    (backward-sexp)
    (insert open)
    (paredit-forward-for-quote target)))

(defun paredit-backward-barf-sexp ()
  "Remove the first S-expression in the current list from that list
  by moving the closing delimiter.
Automatically reindent the barfed S-expression and the form from which
  it was barfed."
  (interactive)
  (paredit-lose-if-not-in-sexp 'paredit-backward-barf-sexp)
  (save-excursion
    (backward-up-list)
    (let ((open (char-after)))
      (delete-char 1)
      (paredit-ignore-sexp-errors
        (paredit-forward-and-indent))
      (while (progn (paredit-skip-whitespace t)
                    (eq (char-after) ?\; ))
        (forward-line 1))
      (if (eobp)
          (error "Barfing all subexpressions with no close-paren?"))
      ;** Don't use `insert' here.  Consider, e.g., barfing from
      ;**   (foo|)
      ;** and how `save-excursion' works.
      (insert-before-markers open))
    (backward-up-list)
    (lisp-indent-line)
    (indent-sexp)))
