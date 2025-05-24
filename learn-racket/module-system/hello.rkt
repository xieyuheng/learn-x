#lang racket

(provide hello)

(define (hello)
  (display "hello ")
  (display (random 30))
  (newline))
