import * as Zmq from "zeromq"
import { eventTypes } from "../utils/eventTypes"
import { randomHexString } from "../utils/randomHexString"

async function run() {
  const client = new Zmq.Request()

  const who = "client"
  const url = "tcp://127.0.0.1:3000"

  // We can set custom id before `connect`.
  client.routingId = randomHexString(10)

  client.connect(url)

  console.log({ who, url })

  for (const eventType of eventTypes()) {
    client.events.on(eventType, (event) => {
      console.log({ who, event })
    })
  }

  const numbers = [3, 4, 5]

  for (const n of numbers) {
    await client.send(["", String(n)])

    const [squared] = await client.receive()

    console.log({
      who,
      n,
      squared: Number(squared),
    })
  }
}

run()
