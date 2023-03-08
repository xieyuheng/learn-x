import * as Zmq from "zeromq"

async function run() {
  const router = new Zmq.Router()

  const who = "router"
  const url = "tcp://127.0.0.1:3000"

  await router.bind(url)

  console.log({ who, url })

  router.events.on("accept", (event) => {
    console.log({ who, event })
  })

  for await (const [routingId, message] of router) {
    const squared = Number(message) * Number(message)
    await router.send([routingId, String(squared)])

    console.log({
      who,
      address: decodeRoutingId(routingId),
      message: Number(message),
      squared,
    })
  }
}

function decodeRoutingId(address: Uint8Array): number {
  return new DataView(address.buffer).getUint32(1)
}

run()
