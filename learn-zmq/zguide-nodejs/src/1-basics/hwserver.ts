import * as Zmq from "zeromq"
import { wait } from "../utils/wait"

async function run() {
  const who = "hwserver"

  const responder = new Zmq.Reply()

  await responder.bind("tcp://*:5555")

  while (true) {
    const [request] = await responder.receive()
    const requestText = request.toString()
    console.log({ who, requestText })

    await wait(500)

    const replyText = `hello ${requestText}`
    await responder.send(replyText)
    console.log({ who, replyText })
  }
}

run()
