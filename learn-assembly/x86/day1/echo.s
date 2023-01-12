    .global _start

    .data

message:
    .space 100

    .text

_start:
    movq $0, %rax
    movq $0, %rdi
    movq $message, %rsi
    movq $100, %rdx
    syscall

    movq $1, %rax
    movq $1, %rdi
    movq $message, %rsi
    movq $100, %rdx
    syscall

    movq $60, %rax
    movq $0, %rdi
    syscall
