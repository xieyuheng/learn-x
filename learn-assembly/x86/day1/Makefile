all: exit hello

exit: exit.o
	ld -o exit exit.o

exit.o: exit.s
	as -o exit.o exit.s

hello: hello.o
	ld -o hello hello.o

hello.o: hello.s
	as -o hello.o hello.s

clean:
	rm exit hello
	rm *.o
