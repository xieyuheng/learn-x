import { VerseTemplate } from "./verse-template"

export class VerseFake implements VerseTemplate {
  lyrics(n: number): string {
    return `This is verse ${n}.\n`
  }
}
