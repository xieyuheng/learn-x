:- use_module(library(clpfd)).

n_factorial(0, 1).
n_factorial(N, F) :-
  N #> 0,
  N1 #= N - 1,
  F #= N * F1,
  n_factorial(N1, F1).

:- initialization(main).

main :-
  n_factorial(1000, F),
  print(F),
  halt.
