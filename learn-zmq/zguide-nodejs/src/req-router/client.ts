import * as Zmq from "zeromq"
import { eventTypes } from "../utils/eventTypes"
import { randomHexString } from "../utils/randomHexString"
import { wait } from "../utils/wait"

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

  let n = 0

  while (true) {
    await client.send(String(n))

    const [squared] = await client.receive()

    console.log({
      who,
      n,
      squared: Number(squared),
    })

    await wait(500)

    n++
  }
}

run()
