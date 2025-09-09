        .global _start

        .data

message:
        .string "Hello, World!\n"
        length = . - message

        .text

_start:
        movq $1, %rax
        movq $1, %rdi
        movq $message, %rsi
        movq $length, %rdx
        syscall

        movq $60, %rax
        movq $0, %rdi
        syscall
