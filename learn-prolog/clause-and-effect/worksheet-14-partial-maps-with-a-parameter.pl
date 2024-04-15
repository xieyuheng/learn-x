reduce([X|T], X, T).
reduce([H|T], X, [H|L]) :- reduce(T, X, L).

%% Maybe `reduce` should be named `remove` or `remove_first`.
%%   reduce([1, 2, 3], 1, L).
%%   reduce([1, 2, 3], X, L).
%%   reduce(A, 1, [1, 2, 3]).

%% In this worksheet, the author said that,
%% we are assuming that only the first answer is correct.
%% This is against the principle of relational programming,
%% because to have this assumption is to view relation only as function.

%% TODO Is it true that, if we transform function to relation according to
%% the method in "the reasoned schemer",
%% this would be the natural result of the transformation.

path(X, X, _).
path(X, Y, L) :- a(X, Z), reduce(L, Z, L1), path(Z, Y, L1).

a(g, h).
a(d, a).
a(g, d).
a(e, d).
a(h, f).
a(e, f).
a(a, e).
a(a, b).
a(b, f).
a(b, c).
a(f, c).

%% path(f, f, []).
%% path(a, b, [a,b,c,d,e,f,g,h]).
%% path(a, Y, [a,a,a,a,a,b,c,d,e,f,g,h]).
