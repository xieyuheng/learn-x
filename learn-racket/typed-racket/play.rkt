#lang typed/racket

(struct pt
  ([x : Real]
   [y : Real]))

(: distance (-> pt pt Real))
(define (distance p1 p2)
  (sqrt (+ (sqr (- (pt-x p2) (pt-x p1)))
           (sqr (- (pt-y p2) (pt-y p1))))))

(distance (pt 0 0) (pt 3.1415 2.7172))
