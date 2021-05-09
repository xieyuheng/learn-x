export class Bottles {
  verse(n: number): string {
    return (
      `${n} ${this.bottles(n)} of milk on the wall, ` +
      `${n} ${this.bottles(n)} of milk.\n` +
      `Take one down and pass it around, ` +
      `${n - 1} ${this.bottles(n - 1)} of milk on the wall.\n`
    )
  }

  bottles(n: number): string {
    return n > 1 ? "bottles" : "bottle"
  }
}
