(defparameter *string* "I'm global")

;; or
;; (defvar *string* "I'm global")

(defun print-variable ()
  (print *string*))

(print-variable) ;; Prints "I'm global"

(let ((*string* "I have dynamic extent")) ;; Binds *string* to a new value
  (print-variable)) ;; Prints "I have dynamic extent"
;; The old value is restored

(print-variable) ;; Prints "I'm global"
