import * as ut from "./ut"
import { BottleNumber } from "./bottle-number"
import { VerseTemplate } from "./verse-template"

export class BottleVerse implements VerseTemplate {
  lyrics(n: BottleNumber): string {
    return (
      ut.capitalize(`${n} of milk on the wall, `) +
      `${n} of milk.\n` +
      `${n.action()}, ` +
      `${n.successor()} of milk on the wall.\n`
    )
  }
}
