import { StackFn, Fn } from "./stack-fn"

function id_fn<A>(): Fn<A, A> {
  return (a) => a
}

console.log(StackFn.from_fn(id_fn))
console.log(StackFn.from_fn((x: number) => x + x))
