import * as Zmq from "zeromq"
import { wait } from "../../utils/wait"

async function run() {
  const sock = new Zmq.Request()

  await sock.bind("tcp://127.0.0.1:3000")

  let count = 0
  while (true) {
    await wait(500)
    await sock.send(`request ${count++}`)
    const [response] = await sock.receive()
    console.log(`response: ${response}`)
  }
}

run()
