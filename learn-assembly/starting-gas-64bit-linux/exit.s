    .global _start

_start:
    movq $60, %rax
    movq $6, %rdi
    syscall
