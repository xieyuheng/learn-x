Source:

- https://zguide.zeromq.org/docs/chapter1/

Compile:

```
gcc <file>.c -o <file> -lczmq -lzmq
clang <file>.c -o <file> -lczmq -lzmq
```

Format:

```
clang-format -style=LLVM src/*.c src/*.h -i
```
