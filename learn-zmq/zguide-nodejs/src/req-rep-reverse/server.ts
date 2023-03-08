import * as Zmq from "zeromq"
import { wait } from "../utils/wait"

async function run() {
  const server = new Zmq.Request()

  await server.bind("tcp://127.0.0.1:3000")

  let count = 0
  while (true) {
    await wait(500)
    await server.send(`request ${count++}`)
    const [response] = await server.receive()
    console.log(`response: ${response}`)
  }
}

run()
