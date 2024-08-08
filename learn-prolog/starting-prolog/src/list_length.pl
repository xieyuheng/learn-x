:- use_module(library(clpfd)).

list_length([], 0).
list_length([_|Ls], N) :-
  N #> 0,
  N #= N0 + 1,
  list_length(Ls, N0).

:- initialization(main).

main :-
  write('Hello World!'), nl,
  list_length(L, 1000000),
  print(L),
  halt.
