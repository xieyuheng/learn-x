import * as ut from "./ut"
import { BottleNumber } from "./bottle-number"
import { VerseTemplate } from "./verse-template"

export class BottleVerse implements VerseTemplate {
  lyrics(n: number): string {
    const b = BottleNumber.for(n)

    return (
      ut.capitalize(`${b} of milk on the wall, `) +
      `${b} of milk.\n` +
      `${b.action()}, ` +
      `${b.successor()} of milk on the wall.\n`
    )
  }
}
