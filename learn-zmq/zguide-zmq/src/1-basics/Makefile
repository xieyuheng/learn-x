targets=hwserver hwclient zmq-version wuserver wuclient taskvent taskwork tasksink

all: $(targets)

$(targets): %: %.c
	gcc -o $@ $< -lczmq -lzmq

clean:
	rm -f $(targets)
