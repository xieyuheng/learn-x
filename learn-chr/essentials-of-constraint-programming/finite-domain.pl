:- use_module(library(chr)).

:- chr_constraint range/3.

inconsistency @ range(_X, A, B) <=> A > B | false.
intersection @ range(X, A, B), range(X, C, D) <=> range(X, AC max(A, C), min(B, D)).

% ?- range(X, 2, 1).
% ?- range(X, 20, 100), range(X, 30, 120).
% ?- range(X, A, B), range(X, C, D).
