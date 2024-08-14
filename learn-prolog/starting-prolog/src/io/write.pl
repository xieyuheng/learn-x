main :-
  open('hogwarts.txt', write, Stream),
  write(Stream, 'Hogwarts'), nl(Stream),
  close(Stream).

:- main, halt.
