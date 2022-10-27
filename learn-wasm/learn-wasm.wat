;; https://learnxinyminutes.com/docs/wasm
;; https://github.com/webassembly/wabt
;;   wat2wasm -v learn-wasm.wat

(module

 (func $double (param $x i32)
       (result i32)
       (local.get $x)
       (local.get $x)
       (i32.add))

 (export "double" (func $double)))
