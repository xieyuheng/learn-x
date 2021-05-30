async function* numGenerator(): AsyncGenerator<number, void, void> {
  let i = 0
  while (i < 3) {
    yield i++
  }
}

async function play(): Promise<void> {
  const iter = numGenerator()
  for await (let n of iter) {
    console.log(n)
  }
}

play()
