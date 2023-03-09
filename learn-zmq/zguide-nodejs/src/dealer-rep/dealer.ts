import * as Zmq from "zeromq"

async function run() {
  const dealer = new Zmq.Dealer()

  const who = "dealer"
  const url = "tcp://127.0.0.1:3000"

  dealer.connect(url)

  console.log({ who, url })

  // A message between `Dealer` and `Reply`,
  // has an empty envelope delimiter frame
  // before the rest frames.

  for (const n of [3, 4, 5]) {
    await dealer.send(["", String(n)])
    const [delimiter, squared] = await dealer.receive()

    console.log({
      who,
      n,
      squared: Number(squared),
    })
  }
}

run()
