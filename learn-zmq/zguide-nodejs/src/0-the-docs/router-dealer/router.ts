import * as Zmq from "zeromq"

async function run() {
  const router = new Zmq.Router()

  const who = "router"
  const url = "tcp://127.0.0.1:3000"

  await router.bind(url)

  console.log({ who, url })

  router.events.on("*", (event) => {
    console.log({ who, event })
  })

  for await (const [id, message] of router) {
    const squared = Number(message) * Number(message)
    await router.send([id, String(squared)])

    console.log({
      who,
      id: decodeId(id),
      message: Number(message),
      squared,
    })
  }
}

function decodeId(id: Uint8Array): number {
  return new DataView(id.buffer).getUint32(1)
}

run()
