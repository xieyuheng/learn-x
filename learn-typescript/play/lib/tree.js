"use strict";
// data Tree = Empty
//           | Leaf Int
//           | Node Tree Tree
Object.defineProperty(exports, "__esModule", { value: true });
class Tree {
    constructor() {
        this.abstract_class_name = "Tree";
    }
}
exports.Tree = Tree;
class Empty extends Tree {
    constructor() { super(); }
}
exports.Empty = Empty;
class Leaf extends Tree {
    constructor(value) {
        super();
        this.value = value;
    }
}
exports.Leaf = Leaf;
class Branch extends Tree {
    constructor(left, right) {
        super();
        this.left = left;
        this.right = right;
    }
}
exports.Branch = Branch;
