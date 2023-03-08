import * as Zmq from "zeromq"

async function run() {
  const client = new Zmq.Reply()

  client.connect("tcp://127.0.0.1:3000")
  console.log("Producer bound to port 3000")

  while (true) {
    const [request] = await client.receive()
    console.log(`request: ${request}`)
    await client.send(["ok"])
  }
}

run()
