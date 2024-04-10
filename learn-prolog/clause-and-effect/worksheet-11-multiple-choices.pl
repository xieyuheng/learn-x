squint([], []).
squint([X | T], [Y | L]) :- integer(X), Y is X * X, squint(T, L).
squint([X | T], [X | L]) :- squint(T, L).
%% squint([X | T], [X | L]) :- not(integer(X)), squint(T, L).
%% squint([X | T], [X | L]) :- \+ integer(X), squint(T, L).

%% `not/1` and `\+/1` mean not provable at that point.

%% squint([1, 3, w, 5, goat], X).

%% it is important to know what will happen when a program backtracks.
%% the behaviour of the relation counter
%%   to our expectations of how the program should work.
%% we need `cut` to fix this
