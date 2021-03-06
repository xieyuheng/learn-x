import { VerseTemplate } from "./verse-template"
import * as ut from "./ut"

interface Options {
  verseTemplate: VerseTemplate
  max?: number
  min?: number
}

const defaultOptions = {
  max: 999999,
  min: 0,
}

export class CountdownSong {
  verseTemplate: VerseTemplate
  max: number
  min: number

  constructor(opts: Options) {
    this.verseTemplate = opts.verseTemplate
    this.max = opts?.max || defaultOptions.max
    this.min = opts?.min || defaultOptions.min
  }

  song(): string {
    return this.verses(this.max, this.min)
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
