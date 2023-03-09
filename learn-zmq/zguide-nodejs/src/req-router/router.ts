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

  for await (const messages of router) {
    console.log(messages.map(String))

    const [id, message] = messages

    const squared = Number(message) * Number(message)
    await router.send([id, String(squared)])

    console.log({
      who,
      id: id.toString(),
      message: Number(message),
      squared,
    })
  }
}

run()
