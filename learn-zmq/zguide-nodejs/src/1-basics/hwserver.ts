import * as Zmq from "zeromq"
import { wait } from "../utils/wait"

async function run() {
  const sock = new Zmq.Reply()

  await sock.bind("tcp://*:5555")

  while (true) {
    const [request] = await sock.receive()
    const requestText = request.toString()
    console.log("[hwserver / receive]", requestText)

    await wait(500)

    const replyText = `hello ${requestText}`
    await sock.send(replyText)
    console.log("[hwserver / send]", replyText)
  }
}

run()
