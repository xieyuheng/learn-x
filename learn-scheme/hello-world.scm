(import (scheme base)
        (scheme write))

(define-syntax let1
  (syntax-rules ()
    ((let ((var expr) ...) body ...)
     ((lambda (var ...) body ...) expr ...))))

(write (let1 ((x "hello world"))
           x))
