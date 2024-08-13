f(a).
f(b).

g(a).
g(b).
g(c).

:- findall(X, f(X), Results), print(Results), nl.
:- findall(["hi", X, Y], (f(X), g(Y)), Results), print(Results), nl.
:- findnsols(4, ["hi", X, Y], (f(X), g(Y)), Results), print(Results), nl.
:- halt.
