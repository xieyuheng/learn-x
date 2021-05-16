import { BottleVerse } from "./bottle-verse"
import * as ut from "./ut"

{
  console.log("[test] verse general rule upper bound")

  const expected =
    "99 bottles of milk on the wall, " +
    "99 bottles of milk.\n" +
    "Take one down and pass it around, " +
    "98 bottles of milk on the wall.\n"

  ut.assertEqual(new BottleVerse().lyrics(99), expected)
}

{
  console.log("[test] verse general rule lower bound")

  const expected =
    "3 bottles of milk on the wall, " +
    "3 bottles of milk.\n" +
    "Take one down and pass it around, " +
    "2 bottles of milk on the wall.\n"

  ut.assertEqual(new BottleVerse().lyrics(3), expected)
}

{
  console.log("[test] verse 7")

  const expected =
    "7 bottles of milk on the wall, " +
    "7 bottles of milk.\n" +
    "Take one down and pass it around, " +
    "1 six-pack of milk on the wall.\n"

  ut.assertEqual(new BottleVerse().lyrics(7), expected)
}

{
  console.log("[test] verse 6")

  const expected =
    "1 six-pack of milk on the wall, " +
    "1 six-pack of milk.\n" +
    "Take one down and pass it around, " +
    "5 bottles of milk on the wall.\n"

  ut.assertEqual(new BottleVerse().lyrics(6), expected)
}

{
  console.log("[test] verse 2")

  const expected =
    "2 bottles of milk on the wall, " +
    "2 bottles of milk.\n" +
    "Take one down and pass it around, " +
    "1 bottle of milk on the wall.\n"

  ut.assertEqual(new BottleVerse().lyrics(2), expected)
}

{
  console.log("[test] verse 1")

  const expected =
    "1 bottle of milk on the wall, " +
    "1 bottle of milk.\n" +
    "Take it down and pass it around, " +
    "no more bottles of milk on the wall.\n"

  ut.assertEqual(new BottleVerse().lyrics(1), expected)
}

{
  console.log("[test] verse 0")

  const expected =
    "No more bottles of milk on the wall, " +
    "no more bottles of milk.\n" +
    "Go to the store and buy some more, " +
    "99 bottles of milk on the wall.\n"

  ut.assertEqual(new BottleVerse().lyrics(0), expected)
}
