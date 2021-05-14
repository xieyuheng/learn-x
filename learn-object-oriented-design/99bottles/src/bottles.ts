import * as ut from "./ut"

export class Bottles {
  song(): string {
    return this.verses(99, 0)
  }

  verses(max: number, min: number): string {
    return ut
      .downTo(max, min)
      .map((n) => this.verse(n))
      .join("\n")
  }

  verse(n: number): string {
    const b = new BottleNumber(n)
    const bs = new BottleNumber(b.successor())

    return (
      `${ut.capitalize(b.quantity())} ${b.container()} of milk on the wall, ` +
      `${b.quantity()} ${b.container()} of milk.\n` +
      `${b.action()}, ` +
      `${bs.quantity()} ${bs.container()} of milk on the wall.\n`
    )
  }
}

export class BottleNumber {
  n: number

  constructor(n: number) {
    this.n = n
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
