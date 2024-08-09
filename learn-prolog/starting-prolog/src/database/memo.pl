% https://lpn.swi-prolog.org/lpnpage.php?pagetype=html&pageid=lpn-htmlse48

:- dynamic add_and_square_memo/3.

add_and_square(X, Y, Res):-
   add_and_square_memo(X, Y, Res), !.
add_and_square(X, Y, Res):-
   Res is (X+Y)*(X+Y),
   assert(add_and_square_memo(X, Y, Res)).

:- initialization(main).

main :-
  add_and_square(3, 7, X),
  writeln(X),
  halt.
