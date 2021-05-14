import * as ut from "./ut"

export class BottleNumber {
  n: number

  constructor(n: number) {
    this.n = n
  }

  static for(n: number): BottleNumber {
    switch (n) {
      case 0:
        return new BottleNumber0()
      // case 1: return new BottleNumber1()
      default:
        return new BottleNumber(n)
    }
  }

  toString(): string {
    return `${this.quantity()} ${this.container()}`
  }

  action(): string {
    return `Take ${this.pronoun()} down and pass it around`
  }

  successor(): number {
    return this.n - 1
  }

  quantity(): string {
    return this.n.toString()
  }

  container(): string {
    if (this.n === 1) {
      return "bottle"
    } else {
      return "bottles"
    }
  }

  pronoun(): string {
    if (this.n === 1) {
      return "it"
    } else {
      return "one"
    }
  }
}

export class BottleNumber0 extends BottleNumber {
  constructor() {
    super(0)
  }

  action(): string {
    return "Go to the store and buy some more"
  }

  successor(): number {
    return 99
  }

  quantity(): string {
    return "no more"
  }
}
