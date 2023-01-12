targets=exit hello echo

all: $(targets)

$(targets): %: %.o
	ld -o $@ $< 

%.o: %.s
	as -o $@ $< 

clean:
	rm -f $(targets)
	rm -f *.o
