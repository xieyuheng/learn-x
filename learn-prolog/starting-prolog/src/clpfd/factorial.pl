:- use_module(library(clpfd)).

factorial(0, 1).
factorial(N, F) :-
  N #> 0,
  N1 #= N - 1,
  F #= N * F1,
  factorial(N1, F1).

:- initialization(main).

main :-
  factorial(1000, F),
  print(F),
  halt.
