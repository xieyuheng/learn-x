targets=example

all: $(targets)

$(targets): %: %.c
	gcc -o $@ $< -lczmq -lzmq

clean:
	rm -f $(targets)
