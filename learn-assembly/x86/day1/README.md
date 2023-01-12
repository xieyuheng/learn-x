# Day1 -- 2023-01-13

这次学 gas，从 64bits 的 linux 开始。

发现一个无声的视频入门系列教程：[GAS x64 GNU Assembler tutorial in Linux](https://www.youtube.com/playlist?list=PLhw53ohdQ4gEgeZLSYJ5aLOeA0k_xS05x)

另外关于为什么要用 `_start`，而不能像课程中用 `main`：https://stackoverflow.com/questions/34758769/load-warning-cannot-find-entry-symbol-start

对于汇编器的来说，hello world 是 exit -- [exit.s](exit.s)，
也就是调用 syscall 退出程序，并且指定一个 exit 数字。

linux syscall 的列表：

- https://filippo.io/linux-syscall-table/
- https://blog.rchapman.org/posts/Linux_System_Call_Table_for_x86_64/

hello world 要难一些 [hello.s](hello.s)

编译的时候不能直接 gcc 而是要用 as + ld：

```
as -o hello.o hello.s
ld -o hello hello.o
```

顺便学习一下用 make：https://makefiletutorial.com
