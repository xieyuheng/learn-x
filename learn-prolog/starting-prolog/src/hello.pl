add(X, zero(), X).
add(X, add1(Y), add1(Z)) :- add(X, Y, Z).

mul(_, zero(), zero()).
mul(X, add1(Y), R) :- mul(X, Y, Z), add(X, Z, R).

:- initialization(main).

main :-
  write('Hello World!'), nl,
  set_prolog_flag(stack_limit, 2_147_483_648),
  Zero = zero(),
  One = add1(Zero),
  Two = add1(One),
  Three = add1(Two),
  Four = add1(Three),
  Five = add1(Four),
  Six = add1(Five),
  Seven = add1(Six),
  Eight = add1(Seven),
  Nine = add1(Eight),
  Ten = add1(Nine),
  mul(Ten, Ten, _100),
  mul(_100, _100, _10000),
  print(_10000),
  % mul(_10000, _100, _1000000),
  % print(_1000000),
  halt.
