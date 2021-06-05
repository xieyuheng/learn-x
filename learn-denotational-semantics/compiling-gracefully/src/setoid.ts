export class Setoid<T> {
  eq: (from: T, to: T) => boolean

  constructor(opts: { eq: (from: T, to: T) => boolean }) {
    this.eq = opts.eq
  }
}

export function assert_eq<T>(setoid: Setoid<T>, from: T, to: T): void {
  if (!setoid.eq(from, to)) {
    throw new Error(
      [
        `I meet a failing assertion in setoid.`,
        `The following two values should be eq.`,
        `from:`,
        `  ${from}`,
        `to:`,
        `  ${to}`,
      ].join("\n")
    )
  }
}
