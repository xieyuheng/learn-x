(defun hello (name)
  (format t "Hello, ~A" name))

(hello "Steve") ; => "Hello, Steve"

(print (equal #(1) #(1)))

(print
 (typecase 1
   (string :string)
   (integer :int)))
