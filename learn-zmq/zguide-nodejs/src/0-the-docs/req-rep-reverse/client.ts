import * as Zmq from "zeromq"

async function run() {
  const sock = new Zmq.Reply()

  sock.connect("tcp://127.0.0.1:3000")
  console.log("Producer bound to port 3000")

  while (true) {
    const [request] = await sock.receive()
    console.log(`request: ${request}`)
    await sock.send(["ok"])
  }
}

run()
