;; nasm -f elf64 to-upper-case.nasm -o to-upper-case.o
;; gcc -m64 -no-pie to-upper-case.o -o to-upper-case.exe

section .bss
  buffer resb 1

section .data

section .text

global main

main:
  mov rbp, rsp   ; for correct debugging

read:
  mov rax, 0        ; specify sys_read call
  mov rdi, 0        ; specify file descriptor 0: standard input
  mov rsi, buffer   ; pass address of the buffer to read to
  mov rdx, 1        ; tell sys_read to read one char from stdin
  syscall           ; call sys_read

  cmp rax, 0        ; look at sys_read's return value in rax
  je exit           ; jump if equal to 0 (0 means eof) to exit:
                    ; or fall through to test for lowercase

  cmp byte [buffer], 61h  ; test input char against lowercase 'a'
  jb write                ; if below 'a' in ascii chart, not lowercase
  cmp byte [buffer], 7ah  ; test input char against lowercase 'z'
  ja write                ; if above 'z' in ascii chart, not lowercase

                          ; at this point, we have a lowercase character
  sub byte [buffer], 20h  ; subtract 20h from lowercase to give uppercase
                          ; and then write out the char to stdout:

write:
  mov rax, 1        ; specify sys_write call
  mov rdi, 1        ; specify file descriptor 1: standard output
  mov rsi, buffer   ; pass address of the character to write
  mov rdx, 1        ; pass number of chars to write
  syscall           ; call sys_write
  jmp read          ; the go to the beginning to get another char

exit:
  ret               ; end program
