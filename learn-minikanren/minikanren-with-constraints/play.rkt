#lang racket

(require (file "minikanren.rkt"))

(run* (x)
  (== x 1))

(run* (x)
  (== x x))

(run* (x)
  (fresh (p d)
    (== p (cons 1 2))
    (== (cons x d) p)))

(run* (x)
  (fresh (p d)
    (== (cons x d) p)
    (== p (cons 1 2))))

(run* (q)
  (fresh (x y)
    (=/= `(,x 3) `(cat ,y))
    (== x 'cat)
    (== y 3)
    (== q `(,x ,y))))

(run* (q)
  (fresh (x y)
    (=/= `(,x 3) `(cat ,y))
    (== x 'cat)
    (== y 4)
    (== q `(,x ,y))))

(run* (q)
  (fresh (x y)
    (=/= `(,x 3) `(cat ,y))
    (== x 'cat)
    (== q `(,x ,y))))
