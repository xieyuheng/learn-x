:- module(hello, []).

:- initialization(main).

main :-
  write('Hello World!'), nl,
  writeln('Hello World!'),
  print('Hello World!'), nl,
  halt.
