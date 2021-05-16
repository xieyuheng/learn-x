import { VerseTemplate } from "./verse-template"
import { BottleVerse } from "./bottle-verse"
import * as ut from "./ut"

interface Options {
  verseTemplate?: VerseTemplate
}

const defaultOptions = {
  verseTemplate: new BottleVerse(),
}

export class CountdownSong {
  verseTemplate: VerseTemplate

  constructor(opts?: Options) {
    this.verseTemplate = opts?.verseTemplate || defaultOptions.verseTemplate
  }

  song(): string {
    return this.verses(99, 0)
  }

  verses(upper: number, lower: number): string {
    return ut
      .downTo(upper, lower)
      .map((n) => this.verse(n))
      .join("\n")
  }

  verse(n: number): string {
    return this.verseTemplate.lyrics(n)
  }
}
