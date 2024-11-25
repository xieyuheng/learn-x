asm = uxnasm

src = $(shell find src -name '*.tal')
bin = $(patsubst src/%,bin/%,$(patsubst %.tal,%.rom,$(src)))

.PHONY: all
all: $(bin)

bin/%.rom: src/%.tal $(headers)
	mkdir -p $(dir $@); $(asm) $< $@

.PHONY: clean
clean:
	rm -rf bin
