:- module(main, [main/0]).

main() :-
  use_module(d1),
  d1(),
  assertz(d:d(1)),
  assertz(d:d(2)),
  d1(),
  use_module(ddd),
  d1().

:- main(), halt.
