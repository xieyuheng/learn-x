%% A relation to compute collected normal form.

%% [q(17, duck), q(15, goose), q(41, quail), q(12, goose), q(37, quail)]
%% [q(17, duck), q(27, goose), q(78, quail)]

coll([], []).
coll([q(N,X)|R], [q(T,X)|R2]) :- collz(X, N, R, Q, T), coll(Q, R2).

collz(_, N, [], [], N).
collz(X, N, [q(Num,X)|R], Q, T) :- M is N + Num, collz(X, M, R, Q, T).
collz(X, N, [Q|R], [Q|Qs], T) :- collz(X, N, R, Qs, T).

%% coll([q(17, duck), q(15, goose), q(41, quail), q(12, goose), q(37, quail)], R).
%% => [q(17, duck), q(27, goose), q(78, quail)]
%% coll([q(17, duck), q(17, duck), q(15, goose), q(41, quail), q(12, goose), q(37, quail)], R).
%% => [q(34, duck), q(27, goose), q(78, quail)]
