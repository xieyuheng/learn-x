import * as ut from "./index"
import * as deepDiff from "deep-diff"

export function assertEqual(x: any, y: any): void {
  if (!ut.equal(x, y)) {
    throw Error(
      "assertEqual fail\n" +
        "the following two values are not equal\n" +
        `x: ${ut.inspect(x)}\n` +
        `y: ${ut.inspect(y)}\n` +
        `diff: ${ut.inspect(deepDiff.diff(x, y))}\n`
    )
  }
}
