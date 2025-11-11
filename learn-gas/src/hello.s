        .global _start

        .data

message:
        .string "Hello, World!\n"
        message.length = . - message

        .text

_start:
        movq $1, %rax
        movq $1, %rdi
        movq $message, %rsi
        movq $message.length, %rdx
        syscall

        movq $60, %rax
        movq $0, %rdi
        syscall
