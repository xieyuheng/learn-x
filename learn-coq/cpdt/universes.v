(* http://adam.chlipala.net/cpdt/html/Cpdt.Universes.html *)

Check 0.
Check nat.
Check Set.
Check Type.

Set Printing Universes.

Check Set.
Check Prop.
Check Type.

Check forall T: Set, T.
Check forall T: Type, T.

Definition id (T: Set) (x: T): T := x.

Check id nat 0.
(* Check id Set nat. *)

Reset id.
Definition id (T: Type) (x: T): T := x.
Check id nat 0.
Check id Set nat.
Check id Type Type.

Check forall T: Type, T -> T.
Check id (forall T: Type, T -> T) id.

(* TODO *)
