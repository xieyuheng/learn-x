age(harry,13).
age(draco,14).
age(ron,13).
age(hermione,13).
age(dumbledore,60).
age(hagrid,30).

:- findall(X, age(X, _), Out), print(Out), nl.
:- setof(X, Y^age(X, Y), Out), print(Out), nl.
:- setof(X, age(X, Y), Out), print(Out), nl.
