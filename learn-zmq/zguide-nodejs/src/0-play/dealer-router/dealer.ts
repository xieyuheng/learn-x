import * as Zmq from "zeromq"
import { randomHexString } from "../../utils/randomHexString"
import { eventTypes } from "./eventTypes"

async function run() {
  const dealer = new Zmq.Dealer()

  const who = "dealer"
  const url = "tcp://127.0.0.1:3000"

  // We can set custom id before `connect`.
  dealer.routingId = randomHexString(10)

  dealer.connect(url)

  console.log({ who, url })

  for (const eventType of eventTypes()) {
    dealer.events.on(eventType, (event) => {
      console.log({ who, event })
    })
  }

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
