cc = gcc
ldflags = -lX11 -lutil
cflags = -g -Wall -Wwrite-strings -Wextra -Werror -O0 -std=c11 -pedantic

src = $(shell find src -name '*.c')
headers = $(shell find src -name '*.h')
lib = $(patsubst src/%,lib/%,$(patsubst %.c,%.o,$(src)))
bin = bin/hello-x-window

.PHONY: all
all: bin/hello-x-window

.PHONY: run
run: bin/hello-x-window
	./bin/hello-x-window

bin/hello-x-window: $(lib) lib/hello-x-window.o
	mkdir -p $(dir $@); $(cc) $^ $(ldflags) -o $@

lib/%.o: src/%.c $(headers)
	mkdir -p $(dir $@); $(cc) -c $(cflags) $< -o $@

.PHONY: clean
clean:
	rm -rf lib bin
