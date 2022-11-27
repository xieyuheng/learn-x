#lang racket

(provide (all-defined-out))

(define (var c) (vector c))

(define var? vector?)

(define (var=? x1 x2) (= (vector-ref x1 0) (vector-ref x2 0)))

(define (make-st S C D)
  (list S C D))

(define (S-of st)
  (car st))

(define (C-of st)
  (cadr st))

(define (D-of st)
  (caddr st))

(define empty-state (make-st '() 0 '()))

(define mzero '())

(define (unit st) (cons st mzero))

(define (ext-S u v S) (cons (cons u v) S))

(define (walk u S)
  (let ([pr (and (var? u) (assoc u S var=?))])
    (if pr
      (walk (cdr pr) S)
      u)))

(define (unify u v S)
  (let ([u (walk u S)]
        [v (walk v S)])
    (cond
      [(and (var? u) (var? v) (var=? u v)) S]
      [(var? u) (ext-S u v S)]
      [(var? v) (ext-S v u S)]
      [(and (pair? u) (pair? v))
       (let ([S (unify (car u) (car v) S)])
         (and S (unify (cdr u) (cdr v) S)))]
      [else (and (eqv? u v) S)])))

(define (== u v)
  (lambda (st)
    (let ([S (unify u v (S-of st))])
      (if S (cons (make-st S (C-of st) (D-of st)) mzero) mzero))))

(define-syntax fresh
  (syntax-rules ()
    [(_ () g0 g ...) (conj+ g0 g ...)]
    [(_ (x0 x ...) g0 g ...)
     (call/fresh (lambda (x0) (fresh (x ...) g0 g ...)))]))

(define (call/fresh f)
  (lambda (st)
    (let ([C (C-of st)])
      ((f (var C)) (make-st (S-of st) (+ C 1) (D-of st))))))

(define (disj g1 g2)
  (lambda (st)
    (mplus (g1 st) (g2 st))))

(define (conj g1 g2)
  (lambda (st)
    (bind (g1 st) g2)))

(define (mplus $1 $2)
  (cond
    [(null? $1) $2]
    [(procedure? $1) (lambda () (mplus $2 ($1)))]
    [(pair? $1) (cons (car $1) (mplus (cdr $1) $2))]))

(define (bind $ g)
  (cond
    [(null? $) mzero]
    [(procedure? $) (lambda () (bind ($) g))]
    [(pair? $) (mplus (g (car $)) (bind (cdr $) g))]))

(define-syntax Zzz
  (syntax-rules ()
    [(_ g) (lambda (st) (lambda () (g st)))]))

(define-syntax disj+
  (syntax-rules ()
    [(_ g) (Zzz g)]
    [(_ g0 g ...) (disj (Zzz g0) (disj+ g ...))]))

(define-syntax conj+
  (syntax-rules ()
    [(_ g) (Zzz g)]
    [(_ g0 g ...) (conj (Zzz g0) (conj+ g ...))]))

(define-syntax conde
  (syntax-rules ()
    [(_ (g0 g ...) ...) (disj+ (conj+ g0 g ...) ...)]))

(define (pull $)
  (if (procedure? $) (pull ($)) $))

(define (take n $)
  (if (zero? n) empty
      (let ([$ (pull $)])
        (cond
          [(null? $) $]
          [else (cons (car $) (take (- n 1) (cdr $)))]))))

(define (take-all $)
  (let ([$ (pull $)])
    (if (null? $) $ (cons (car $) (take-all (cdr $))))))

(define (reify-1st st*)
  (map (reify-var-state (var 0)) st*))

(define ((reify-var-state v) st)
  (let ([v (walk* v (S-of st))])
    (walk* v (reify-S v '()))))


(define (reify-S v S)
  (let ([v (walk v S)])
    (cond
      [(var? v)
       (let ([n (reify-name (length S))])
         (cons (cons v n) S))]
      [(pair? v) (reify-S (cdr v) (reify-S (car v) S))]
      [else S]))); number, bool

(define (reify-name n)
  (string->symbol
   (string-append "_." (number->string n))))

(define (walk* v S)
  (let ([v (walk v S)])
    (cond
      [(var? v) v]
      [(pair? v) (cons (walk* (car v) S)
                       (walk* (cdr v) S))]
      [else v])))

(define-syntax run*
  (syntax-rules ()
    [(_ (x) g0 g ...)
     (reify-1st (take-all (call/empty-state
                           (fresh (x) g0 g ...))))]))

(define-syntax run
  (syntax-rules ()
    [(_ n (x) g0 g ...)
     (reify-1st (take n (call/empty-state
                         (fresh (x) g0 g ...))))]))

(define (call/empty-state g) (g empty-state))

;; Disequality

(define (=/= u v)
  (lambda (st)
    (let ([S (S-of st)]
          [C (C-of st)]
          [D (D-of st)])
      (cond
        [(unify u v S) => (post-unify-=/= S C D)]
        [else (unit st)]))))

(define (post-unify-=/= S C D)
  (lambda (S+)
    (cond
      [(eq? S+ S) mzero]
      [else (let ([d (prefix-S S+ S)])
              (unit (make-st S C (cons d D))))])))

(define (prefix-S S+ S)
  (cond
    [(eq? S+ S) '()]
    [else (cons (car S+) (prefix-S (cdr S+) S))]))

(define (unify* d S)
  (cond
    [(null? d) S]
    [(unify (caar d) (cdar d) S) =>
                                 (lambda (S)
                                   (unify* (cdr d) S))]
    [else #f]))
