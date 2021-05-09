export class Bottles {
  verse(n: number): string {
    return (
      `${n} bottles of milk on the wall, ` +
      `${n} bottles of milk.\n` +
      `Take one down and pass it around, ` +
      `${n - 1} bottles of milk on the wall.\n`
    )
  }
}
