:- use_module(library(chr)).

:- chr_constraint rain/0, wet/0, umbrella/0.

rain ==> wet.
rain ==> umbrella.

% ?- rain.
% rain, wet, umbrella.

:- chr_constraint left/0, right/0, forward/0, backward/0.

left, right <=> true.
forward, backward <=> true.

% ?- left, forward, right, right, forward, forward, backward, left, left.
% left, forward, forward.

:- chr_constraint male/1, female/1, pair/2.

male(X), female(Y) ==> pair(X, Y).

% ?- male(bob), female(alice), male(tom).
% male(tom), pair(bob, alice).

:- chr_constraint mother/2, grandmother/2.

mm @ mother(X, Y), mother(Y, Z) ==> grandmother(X, Z).

% ?- mother(joe, ann), mother(ann, sue).
% mother(ann, sue),
% mother(joe, ann),
% grandmother(joe, sue).

md @ mother(X, Y) \ mother(X, Z) <=> Y = Z.

% ?- mother(joe, ann), mother(joe, X).
% X = ann,
% mother(joe, ann).

% ?- mother(joe, ann), mother(joe, sue).
% false.

:- chr_constraint company/2.

% company(Name1, Value1), company(Name2, Value2)
% <=> Value1 > Value2 | company(Name1:Name2, Value1 + Value2).

company(Name1, Value1), company(Name2, Value2)
<=> Value1 > Value2 | Value is Value1 + Value2, company(Name1:Name2, Value).

% ?- company(tesla, 100), company(twitter, 30), company(google, 50).
% company((tesla:twitter):google, 180).
