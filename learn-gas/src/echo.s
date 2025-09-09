    .global _start

    .data

message:
    length = 100
    .space length

    .text

_start:
    movq $0, %rax
    movq $0, %rdi
    movq $message, %rsi
    movq $length, %rdx
    syscall

    movq $1, %rax
    movq $1, %rdi
    movq $message, %rsi
    movq $length, %rdx
    syscall

    movq $60, %rax
    movq $0, %rdi
    syscall
