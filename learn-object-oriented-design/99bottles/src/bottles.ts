import * as ut from "./ut"
import { BottleNumber } from "./bottle-number"

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
    const b = BottleNumber.for(n)
    const bs = BottleNumber.for(b.successor())

    return (
      ut.capitalize(`${b} of milk on the wall, `) +
      `${b} of milk.\n` +
      `${b.action()}, ` +
      `${bs} of milk on the wall.\n`
    )
  }
}
