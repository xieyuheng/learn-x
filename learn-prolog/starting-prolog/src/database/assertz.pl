% https://lpn.swi-prolog.org/lpnpage.php?pagetype=html&pageid=lpn-htmlse48

:- initialization(main).

main :-
  assertz(happy(mia)),
  assertz(happy(vincent)),
  assertz(happy(marcellus)),
  assertz(happy(butch)),
  assertz(happy(vincent)),

  listing(happy),

  retract(happy(marcellus)),
  retract(happy(vincent)),

  listing(happy),

  assertz(naive(X):- happy(X)),

  listing(naive),

  naive(X),
  writeln(X),

  halt.
