targets=hwserver hwclient zmq-version wuserver wuclient

all: $(targets)

$(targets): %: %.c
	gcc -o $@ $< -lczmq -lzmq

clean:
	rm -f $(targets)
