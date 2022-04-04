Inductive bool : Type :=
| true  : bool
| false : bool.


Definition negb (b : bool) : bool :=
  match b with
  | true  => false
  | false => true
  end.


Definition andb
  (b1 : bool)
  (b2 : bool) : bool
  :=
  match b1 with
  | true => b2
  | false => false
  end.


Definition orb (b1 : bool) (b2 : bool): bool :=
  match b1 with
  | true => true
  | false => b2
  end.
