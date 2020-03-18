// data Tree = Empty
//           | Leaf Int
//           | Node Tree Tree

export abstract class Tree {
  abstract_class_name: "Tree" = "Tree"
}

export class Empty extends Tree {
  constructor(
  ) { super() }
}

export class Leaf extends Tree {
  constructor(
    public value: number,
  ) { super() }
}

export class Branch extends Tree {
  constructor(
    public left: Tree,
    public right: Tree,
  ) { super() }
}
