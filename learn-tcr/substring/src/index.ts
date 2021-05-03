import * as ut from "./ut"

export function concat_substring(
  left: string,
  right: string,
  start: number,
  end: number
): string {
  const new_left = left.substring(start, end)
  const new_right = right.substring(start - left.length, end - left.length)
  return new_left.concat(new_right)
}

ut.assert_equal(concat_substring("abc", "def", 2, 5), "cde")
