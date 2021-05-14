import * as ut from "./ut"

export class BottleNumber {
  n: number

  constructor(n: number) {
    this.n = n
  }

  toString(): string {
    return `${this.quantity()} ${this.container()}`
  }

  action(): string {
    if (this.n === 0) {
      return "Go to the store and buy some more"
    } else {
      return `Take ${this.pronoun()} down and pass it around`
    }
  }

  successor(): number {
    if (this.n === 0) {
      return 99
    } else {
      return this.n - 1
    }
  }

  quantity(): string {
    if (this.n === 0) {
      return "no more"
    } else {
      return this.n.toString()
    }
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
