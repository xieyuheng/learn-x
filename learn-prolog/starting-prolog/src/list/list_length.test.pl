:- use_module("../kkk.pl").

:- initialization(main).

main :-
  list_length(L, 100),
  list_print(L),
  halt.
