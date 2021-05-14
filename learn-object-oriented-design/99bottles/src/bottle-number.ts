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
      case 1:
        return new BottleNumber1()
      case 6:
        return new BottleNumber6()
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

  successor(): BottleNumber {
    return BottleNumber.for(this.n - 1)
  }

  quantity(): string {
    return this.n.toString()
  }

  container(): string {
    return "bottles"
  }

  pronoun(): string {
    return "one"
  }
}

export class BottleNumber0 extends BottleNumber {
  constructor() {
    super(0)
  }

  action(): string {
    return "Go to the store and buy some more"
  }

  successor(): BottleNumber {
    return BottleNumber.for(99)
  }

  quantity(): string {
    return "no more"
  }
}

export class BottleNumber1 extends BottleNumber {
  constructor() {
    super(1)
  }

  container(): string {
    return "bottle"
  }

  pronoun(): string {
    return "it"
  }
}

export class BottleNumber6 extends BottleNumber {
  constructor() {
    super(6)
  }

  container(): string {
    return "six-pack"
  }

  quantity(): string {
    return "1"
  }
}
