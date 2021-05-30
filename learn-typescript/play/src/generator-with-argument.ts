function* generator(): Generator<string, void, number> {
  const bar: number = yield "foo"
  yield bar.toString()
}

const iterator = generator()

console.log(iterator.next())
console.log(iterator.next(100))
console.log(iterator.next())
