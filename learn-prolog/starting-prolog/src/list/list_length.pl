:- module(list_length, [list_length/2, list_print/1]).
:- use_module(library(clpfd)).

list_length([], 0).
list_length([_|Ls], N) :-
  N #> 0,
  N #= N0 + 1,
  list_length(Ls, N0).

list_print(L) :- writeln(L).
