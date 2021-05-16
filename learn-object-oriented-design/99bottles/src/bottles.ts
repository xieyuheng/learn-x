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
    const verseTemplate: VerseTemplate = new BottleVerse()
    return verseTemplate.lyrics(BottleNumber.for(n))
  }
}

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

export interface VerseTemplate {
  lyrics(n: BottleNumber): string
}
