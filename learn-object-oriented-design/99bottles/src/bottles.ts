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
    const nb = new BottleNumber(b.successor())

    return (
      `${ut.capitalize(b.quantity())} ${b.container()} of milk on the wall, ` +
      `${b.quantity()} ${b.container()} of milk.\n` +
      `${b.action()}, ` +
      `${nb.quantity()} ${nb.container()} of milk on the wall.\n`
    )
  }

  action(n: number): string {
    return new BottleNumber(n).action()
  }

  successor(n: number): number {
    return new BottleNumber(n).successor()
  }

  quantity(n: number): string {
    return new BottleNumber(n).quantity()
  }

  pronoun(n: number): string {
    return new BottleNumber(n).pronoun()
  }

  container(n: number): string {
    return new BottleNumber(n).container()
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
