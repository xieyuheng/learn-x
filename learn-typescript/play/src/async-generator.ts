async function* numGen(): AsyncGenerator<number, void, void> {
  let i = 0
  while (i < 3) {
    yield i++
  }
}

async function play(): Promise<void> {
  for await (let n of numGen()) {
    console.log(n)
  }
}

play()
