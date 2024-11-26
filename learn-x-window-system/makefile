cc = gcc
ldflags = -lX11
cflags = -g -Wall -Wwrite-strings -Wextra -Werror -O0 -std=c11 -pedantic

src = $(shell find src -name '*.c')
headers = $(shell find src -name '*.h')
lib = $(patsubst src/%,lib/%,$(patsubst %.c,%.o,$(src)))
bin = bin/main

.PHONY: all
all: bin/main

.PHONY: run
run: bin/main
	./bin/main

bin/main: $(lib) lib/main.o
	mkdir -p $(dir $@); $(cc) $^ $(ldflags) -o $@

lib/%.o: src/%.c $(headers)
	mkdir -p $(dir $@); $(cc) -c $(cflags) $< -o $@

.PHONY: clean
clean:
	rm -rf lib bin
