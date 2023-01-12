    .global _start

    .data

hello:
    .string "hello\n"
    .text

_start:
    movq $1, %rax
    movq $1, %rdi
    movq $hello, %rsi
    movq $7, %rdx
    syscall

    movq $60, %rax
    movq $0, %rdi
    syscall
