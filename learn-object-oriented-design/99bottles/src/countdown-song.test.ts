import { CountdownSong } from "./countdown-song"
import { VerseFake } from "./verse-fake"
import * as ut from "./ut"

{
  console.log("[test] verse")

  const expected = "This is verse 500.\n"

  const opts = { verseTemplate: new VerseFake() }

  ut.assertEqual(new CountdownSong(opts).verse(500), expected)
}

{
  console.log("[test] verses")

  const expected =
    "This is verse 99.\n" +
    "\n" +
    "This is verse 98.\n" +
    "\n" +
    "This is verse 97.\n"

  const opts = { verseTemplate: new VerseFake() }

  ut.assertEqual(new CountdownSong(opts).verses(99, 97), expected)
}

{
  console.log("[test] song")

  const expected =
    "This is verse 47.\n" +
    "\n" +
    "This is verse 46.\n" +
    "\n" +
    "This is verse 45.\n" +
    "\n" +
    "This is verse 44.\n" +
    "\n" +
    "This is verse 43.\n"

  const opts = { verseTemplate: new VerseFake(), max: 47, min: 43 }

  ut.assertEqual(new CountdownSong(opts).song(), expected)
}
