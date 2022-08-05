import * as ut from "./ut"

export type Rope = RopeRequired & RopeExp & RopeAPI

export type RopeRequired = {
  to_string(): string
  length: number
}

export type RopeExp = {
  substr(start: number, length: number): Rope
  concat(that: Rope): Rope
}

export type RopeAPI = {
  delete(start: number, length: number): Rope
  insert(rope: Rope, start: number): Rope
}

export function Rope(the: RopeRequired): Rope {
  return {
    to_string: the.to_string,
    length: the.length,

    substr(start, length) {
      return Substr(this, start, length)
    },

    concat(that) {
      return Concat(this, that)
    },

    delete(start, length) {
      const left = this.substr(0, start)
      const right = this.substr(start + length, this.length - start - length)
      return left.concat(right)
    },

    insert(rope, start) {
      const left = this.substr(0, start)
      const right = this.substr(start, this.length - start)
      return left.concat(rope).concat(right)
    }
  }
}

export const Unit = (str: string) =>
  Rope({
    to_string() {
      return str
    },

    length: str.length,
  })

export const Substr = (rope: Rope, start: number, length: number) =>
  Rope({
    to_string() {
      return rope.to_string().substr(start, length)
    },

    length,
  })

export const Concat = (left: Rope, right: Rope) =>
  Rope({
    to_string() {
      return left.to_string().concat(right.to_string())
    },

    length: left.length + right.length,
  })

ut.assert_equal(Unit("abcde").to_string(), "abcde")
ut.assert_equal(Unit("abcde").substr(1, 3).to_string(), "bcd")
ut.assert_equal(Unit("abcde").substr(1, 3).substr(1, 2).to_string(), "cd")
ut.assert_equal(Unit("abc").concat(Unit("de")).to_string(), "abcde")

ut.assert_equal(Unit("abcde").length, 5)
ut.assert_equal(Unit("abcde").substr(1, 3).length, 3)
ut.assert_equal(Unit("abc").concat(Unit("de")).length, 5)

ut.assert_equal(Unit("abcde").delete(1, 3).to_string(), "ae")
ut.assert_equal(Unit("abc").concat(Unit("de")).delete(1, 3).to_string(), "ae")

ut.assert_equal(Unit("abe").insert(Unit("cd"), 2).to_string(), "abcde")
ut.assert_equal(Unit("abf").insert(Unit("cde"), 2).to_string(), "abcdef")
