cflags=
cc=gcc
ldflags=
src = $(shell find src -name '*.c')
lib = $(patsubst src/%, lib/%, $(patsubst %.c, %.o, $(src)))
out = $(patsubst src/%, out/%, $(patsubst %.c, %, $(src)))

.PHONY: all clean
.PRECIOUS: lib/%.o

all: $(out) 

.SECONDARY: out/%
out/%: lib/%.o
	mkdir -p $(dir $@); $(cc) $(ldflags) $< -o $@


lib/%.o: src/%.c
	mkdir -p $(dir $@); $(cc) -c $(cflags) $< -o $@

clean:
	rm -rf lib out
