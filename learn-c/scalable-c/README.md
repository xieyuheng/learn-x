Source:

- https://hintjens.gitbooks.io/scalable-c/content/preface.html

Compile:

```
gcc <file>.c -o <file> -lczmq -lzmq
clang <file>.c -o <file> -lczmq -lzmq
```

Format:

```
clang-format -style=LLVM src/*.c src/*.h -i
```
