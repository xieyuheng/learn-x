import * as Tree from "./tree"
import * as Err from "./err"

let empty = new Tree.Empty()
let leaf_1 = new Tree.Leaf(1)
let leaf_2 = new Tree.Leaf(2)
let leaf_3 = new Tree.Leaf(3)
let branch_1 = new Tree.Branch(leaf_1, leaf_2)
let branch_2 = new Tree.Branch(leaf_3, branch_1)

function height(tree: Tree.Tree): number {
  if (tree instanceof Tree.Empty)
    return 0
  else if (tree instanceof Tree.Leaf)
    return 1
  else if (tree instanceof Tree.Branch) {
    let { left, right } = tree
    return Math.max(height(left), height(right))
    // NOTE alternative style:
    //   return Math.max(height(tree.left), height(tree.right))
    // NOTE alternative style:
    //   let branch = tree
    //   return Math.max(height(branch.left), height(branch.right))
  }
  else
    throw new Err.Unhandled(tree)
}

console.log(height(empty))
console.log(height(leaf_1))
console.log(height(leaf_2))
console.log(height(leaf_3))
console.log(height(branch_1))
console.log(height(branch_2))
