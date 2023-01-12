    .global _start

_start:
    movq $60, %rax
    movq $8, %rdi
    syscall
