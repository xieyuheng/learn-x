main :-
  open('houses.txt', read, Str),
  read(Str, House1),
  read(Str, House2),
  read(Str, House3),
  read(Str, House4),
  close(Str),
  write([House1, House2, House3, House4]), nl.

:- main, halt.
