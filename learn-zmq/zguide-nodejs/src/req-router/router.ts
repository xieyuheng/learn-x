import * as Zmq from "zeromq"
import { eventTypes } from "../utils/eventTypes"

async function run() {
  const router = new Zmq.Router()

  const who = "router"
  const url = "tcp://127.0.0.1:3000"

  await router.bind(url)

  console.log({ who, url })

  for (const eventType of eventTypes()) {
    router.events.on(eventType, (event) => {
      console.log({ who, event })
    })
  }

  // A message between `Router` and `Request`,
  // has an empty envelope delimiter frame
  // between the id and the rest frames.

  for await (const [id, delimiter, n] of router) {
    const squared = Number(n) * Number(n)
    await router.send([id, delimiter, String(squared)])

    console.log({
      who,
      id: id.toString(),
      n: Number(n),
      squared,
    })
  }
}

run()
