targets=exit hello

all: $(targets)

$(targets): %: %.o
	ld -o $@ $< 

%.o: %.s
	as -o $@ $< 

clean:
	rm $(targets)
	rm *.o
