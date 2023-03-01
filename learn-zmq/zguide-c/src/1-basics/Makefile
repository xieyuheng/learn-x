targets=hwserver hwclient

all: $(targets)

$(targets): %: %.c
	gcc -o $@ $< -lczmq -lzmq

clean:
	rm -f $(targets)
