:- module(d1, [d1/0]).

:- use_module("d.pl").

d1() :-
  findall(D, d(D), Ds),
  print(Ds), nl.
