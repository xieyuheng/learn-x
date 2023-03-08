import * as Zmq from "zeromq"

async function run() {
  const dealer = new Zmq.Dealer()

  dealer.connect("tcp://127.0.0.1:3000")

  const who = "dealer"

  console.log({ who, url: "tcp://127.0.0.1:3000" })

  await dealer.send(String(3))
  await dealer.send(String(4))
  await dealer.send(String(5))

  while (true) {
    const [squared] = await dealer.receive()

    console.log({
      who,
      squared: Number(squared),
    })
  }
}

run()
