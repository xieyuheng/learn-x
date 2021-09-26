#lang racket

;; NOTE Helper functions.

(define assert
  (lambda (x)
    (cond
      ((eq? x #t) 'ok)
      (else (error "assertion fail")))))

(define build
  (lambda (x y)
    (cons x (cons y '()))))

(define first
  (lambda (x)
    (car x)))

(define second
  (lambda (x)
    (car (cdr x))))

(assert (eq? (second (build 'loli 'pop)) 'pop))

(define new-entry build)

(assert (eq? (second (new-entry 'loli 'pop)) 'pop))
(assert (eq? (first (new-entry 'loli 'pop)) 'loli))

(define example-entry-1
  (new-entry '(appetizer entree beverage)
             '(food tastes good)))

(define lookup-in-entry
  (lambda (name entry entry-f)
    (lookup-in-entry-help name
     (first entry)
     (second entry)
     entry-f)))

(define lookup-in-entry-help
  (lambda (name names values entry-f)
    (cond
      ((null? names) (entry-f name))
      ((eq? name (car names)) (car values))
      (else (lookup-in-entry-help
             name (cdr names) (cdr values) entry-f)))))

(define identity (lambda (x) x))

(assert (eq? (lookup-in-entry 'entree example-entry-1 identity) 'tastes))

(assert (eq? (lookup-in-entry 'dessert example-entry-1 identity)
             (identity 'dessert)))

(define extend-table cons)

(define lookup-in-table
  (lambda (name table table-f)
    (cond
      ((null? table) (table-f name))
      (else
       (lookup-in-entry
        name
        (car table)
        (lambda (name)
          (lookup-in-table
           name
           (cdr table)
           table-f)))))))

(define example-table-1
  '(((entree dessert)
     (cake spaghetti))
    ((appetizer entree beverage)
     (food tastes good))))

(assert (eq? (lookup-in-table 'entree example-table-1 identity)
             'cake))

(assert (eq? (lookup-in-table 'beverage example-table-1 identity)
             'good))

(assert (eq? (lookup-in-table 'x example-table-1 identity)
             (identity 'x)))

;; (print (cons 'a (cons 'b (cons 'c '()))))

;; (print (cons 'car
;;              (cons
;;               (cons 'quote
;;                     (cons
;;                      (cons 'a (cons 'b (cons 'c '())))
;;                      '()))
;;               '())))



;; NOTE test interpreter.

(assert
 (eq? (value
       '(car (quote (a b c))))
      'a))

(assert
 (eq? (value
       '(quote (car (quote (a b c)))))
      '(car (quote (a b c)))))

(assert
 (eq? (value
       '(add1 6))
      7))

(assert
 (eq? (value
       6)
      6))

(assert
 (eq? (value
       '(quote nothing))
      'nothing))

(assert
 (eq? (value
       '((lambda (nothing)
           (cons nothing (quote ())))
         (quote
             (from nothing comes something))))
      '((from nothing comes something))))
