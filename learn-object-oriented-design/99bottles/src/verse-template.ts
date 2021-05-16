import { BottleNumber } from "./bottle-number"

export interface VerseTemplate {
  lyrics(n: BottleNumber): string
}
