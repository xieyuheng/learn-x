#lang racket

(require (file "minikanren.rkt"))

(run* (x)
  (== x 1))

(run* (x)
  (== x x))
