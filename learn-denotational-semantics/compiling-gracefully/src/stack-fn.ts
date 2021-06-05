export type Fn<A, B> = (a: A) => B

export class StackFn<A, B, Z> {
  stack_fn: ([a, z]: [A, Z]) => [B, Z]

  constructor(stack_fn: ([a, z]: [A, Z]) => [B, Z]) {
    this.stack_fn = stack_fn
  }

  static from_fn<A, B, Z>(fn: Fn<A, B>): StackFn<A, B, Z> {
    return new StackFn(([a, z]) => [fn(a), z])
  }
}
