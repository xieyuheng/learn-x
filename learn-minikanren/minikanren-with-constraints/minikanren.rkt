#lang racket

(provide (all-defined-out))

(define (var c) (vector c))

(define var? vector?)

(define (var=? x1 x2) (= (vector-ref x1 0) (vector-ref x2 0)))

(define (make-st S C)
  '(,S ,C))

(define (S-of st)
  (car st))

(define (C-of st)
  (cadr st))

(define empty-state (make-st '() 0))

(define mzero '())

(define (unit st) (cons st mzero))
