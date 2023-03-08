import * as Zmq from "zeromq"

async function run() {
  const router = new Zmq.Router()

  const who = "router"
  const url = "tcp://127.0.0.1:3000"

  await router.bind(url)

  console.log({ who, url })

  for await (const [address, message] of router) {
    const squared = Number(message) * Number(message)
    await router.send([address, String(squared)])

    console.log({
      who,
      address: decodeAddress(address),
      message: Number(message),
      squared,
    })
  }
}

function decodeAddress(address: Uint8Array): number {
  return new DataView(address.buffer).getUint32(1)
}

run()
