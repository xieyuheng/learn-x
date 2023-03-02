import * as Zmq from "zeromq"

async function run() {
  const sock = new Zmq.Request()

  await sock.connect("tcp://127.0.0.1:5555")

  for (let requestNbr = 0; requestNbr < 10; requestNbr++) {
    const requestText = String(requestNbr)
    await sock.send(requestText)
    console.log(`[hwclient / send]`, requestText)

    const [reply] = await sock.receive()
    const replyText = reply.toString()
    console.log(`[hwclient / receive]`, replyText)
  }
}

run()
