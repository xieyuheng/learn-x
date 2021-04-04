export declare abstract class Tree {
    abstract_class_name: "Tree";
}
export declare class Empty extends Tree {
    constructor();
}
export declare class Leaf extends Tree {
    value: number;
    constructor(value: number);
}
export declare class Branch extends Tree {
    left: Tree;
    right: Tree;
    constructor(left: Tree, right: Tree);
}
