import { Category } from "./category"

export type Fn<A, B> = (a: A) => B

export class StackFn<A, B, Z> {
  stack_fn: ([a, z]: [A, Z]) => [B, Z]

  constructor(stack_fn: ([a, z]: [A, Z]) => [B, Z]) {
    this.stack_fn = stack_fn
  }

  static from_fn<A, B, Z>(fn: Fn<A, B>): StackFn<A, B, Z> {
    return new StackFn(([a, z]) => [fn(a), z])
  }

  static id<A, Z>(): StackFn<A, A, Z> {
    return StackFn.from_fn(id_fn())
  }
}

const stack_fn_category: Category<> = new Category({
  
})
  
function id_fn<A>(): Fn<A, A> {
  return (a) => a
}

console.log(StackFn.from_fn(id_fn))
console.log(StackFn.from_fn((x: number) => x + x))
