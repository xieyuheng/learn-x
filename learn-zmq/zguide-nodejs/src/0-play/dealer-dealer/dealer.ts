import * as Zmq from "zeromq"

async function run() {
  const dealer = new Zmq.Dealer()

  const who = "dealer"
  const url = "tcp://127.0.0.1:3000"

  dealer.connect(url)

  console.log({ who, url })

  for (const n of [3, 4, 5]) {
    await dealer.send(String(n))
    const [squared] = await dealer.receive()

    console.log({
      who,
      n,
      squared: Number(squared),
    })
  }
}

run()
