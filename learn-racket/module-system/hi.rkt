#lang racket

(require "hello.rkt")

(provide hi hello)

(define (hi)
  (display "hi ")
  (display (random 30))
  (newline))
