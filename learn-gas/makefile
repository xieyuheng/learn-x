asmflags=
asm=as
ldflags=
src = $(shell find src -name '*.s')
lib = $(patsubst src/%, lib/%, $(patsubst %.s, %.o, $(src)))
out = $(patsubst src/%, out/%, $(patsubst %.s, %, $(src)))

.PHONY: all clean

all: $(out) 

out/%: lib/%.o
	mkdir -p $(dir $@); ld $(ldflags) $< -o $@

lib/%.o: src/%.s
	mkdir -p $(dir $@); $(asm) $(asmflags) $< -o $@

clean:
	rm -rf lib out
