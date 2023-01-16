:- use_module(library(chr)).

:- chr_constraint lteq/2.

lteq(X, Y), lteq(Y, Z) ==> lteq(X, Z).

% ?- lteq(1, 2), lteq(2, 3).
% ?- lteq(2, 3), lteq(1, 2).

% ?- lteq(1, 2), lteq(2, 3), lteq(1, 3).
% ?- lteq(1, 3), lteq(1, 2), lteq(2, 3).

% ?- lteq(1, 2), lteq(2, 3), lteq(1, 3), lteq(1, 3).
% ?- lteq(1, 3), lteq(1, 2), lteq(2, 3), lteq(1, 3).
