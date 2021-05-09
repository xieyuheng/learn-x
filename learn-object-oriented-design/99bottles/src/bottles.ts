export class Bottles {
  verse(n: number): string {
    return (
      `${n} ${this.bottles(n)} of milk on the wall, ` +
      `${n} ${this.bottles(n)} of milk.\n` +
      this.ending(n - 1)
    )
  }

  ending(n: number): string {
    return n === 0
      ? `Take it down and pass it around, ` +
          `no more bottles of milk on the wall.\n`
      : `Take one down and pass it around, ` +
          `${n} ${this.bottles(n)} of milk on the wall.\n`
  }

  bottles(n: number): string {
    return n > 1 ? "bottles" : "bottle"
  }
}
