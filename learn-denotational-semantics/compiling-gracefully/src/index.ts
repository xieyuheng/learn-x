export class StackFn<A, B, Z> {
  stack_fn: ([a, z]: [A, Z]) => [B, Z]

  constructor(stack_fn: ([a, z]: [A, Z]) => [B, Z]) {
    this.stack_fn = stack_fn
  }

  static from_fn<A, B, Z>(fn: (a: A) => B): StackFn<A, B, Z> {
    return new StackFn(([a, z]) => [fn(a), z])
  }
}

console.log(StackFn.from_fn((x: number) => x + x))
