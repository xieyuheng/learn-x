import * as ut from "./ut"

export class Bottles {
  verses(max: number, min: number): string {
    return ut
      .downTo(max, min)
      .map((n) => this.verse(n))
      .join("\n")
  }

  verse(n: number): string {
    if (n === 0) {
      return (
        `No more bottles of milk on the wall, ` +
        `no more bottles of milk.\n` +
        `Go to the store and buy some more, ` +
        `99 bottles of milk on the wall.\n`
      )
    } else {
      return (
        `${n} ${this.bottles(n)} of milk on the wall, ` +
        `${n} ${this.bottles(n)} of milk.\n` +
        this.ending(n - 1)
      )
    }
  }

  ending(n: number): string {
    if (n === 0) {
      return (
        `Take it down and pass it around, ` +
        `no more bottles of milk on the wall.\n`
      )
    } else {
      return (
        `Take one down and pass it around, ` +
        `${n} ${this.bottles(n)} of milk on the wall.\n`
      )
    }
  }

  bottles(n: number): string {
    if (n > 1) {
      return "bottles"
    } else {
      return "bottle"
    }
  }
}
