:- use_module(library(chr)).
:- chr_constraint rain/0, wet/0, umbrella/0.

rain ==> wet.
rain ==> umbrella.

:- initialization
        (   write(rain)
        ->  halt
        ;   halt(1)
        ).

:- chr_constraint left/0, right/0, forward/0, backward/0.
