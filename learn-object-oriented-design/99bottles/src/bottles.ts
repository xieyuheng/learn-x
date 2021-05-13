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
    return (
      `${ut.capitalize(this.quantity(n))} ${this.container(
        n
      )} of milk on the wall, ` +
      `${this.quantity(n)} ${this.container(n)} of milk.\n` +
      this.action(n) +
      `${this.quantity(this.successor(n))} ${this.container(
        this.successor(n)
      )} of milk on the wall.\n`
    )
  }

  successor(n: number): number {
    if (n === 0) {
      return 99
    } else {
      return n - 1
    }
  }

  action(n: number): string {
    if (n === 0) {
      return `Go to the store and buy some more, `
    } else {
      return `Take ${this.pronoun(n)} down and pass it around, `
    }
  }

  quantity(n: number): string {
    if (n === 0) {
      return "no more"
    } else {
      return n.toString()
    }
  }

  pronoun(n: number): string {
    if (n === 1) {
      return "it"
    } else {
      return "one"
    }
  }

  container(n: number): string {
    if (n === 1) {
      return "bottle"
    } else {
      return "bottles"
    }
  }
}
