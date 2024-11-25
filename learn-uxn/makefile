asm = uxnasm

src = $(shell find src -name '*.tal')
lib = $(patsubst src/%,lib/%,$(patsubst %.tal,%.rom,$(src)))

.PHONY: all
all: $(lib)

lib/%.rom: src/%.tal $(headers)
	mkdir -p $(dir $@); $(asm) $< $@

.PHONY: clean
clean:
	rm -rf lib
