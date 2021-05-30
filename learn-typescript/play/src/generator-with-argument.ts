function* generator(): Generator<string, void, number> {
  const bar: number = yield "foo"
  yield bar.toString()
}

const iter = generator()

console.log(iter.next())
console.log(iter.next(100))
console.log(iter.next())
