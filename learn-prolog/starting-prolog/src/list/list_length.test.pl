:- use_module(list_length).

:- initialization(main).

main :-
  list_length(L, 100),
  list_print(L),
  halt.
