import * as Zmq from "zeromq"
import { wait } from "../utils/wait"

async function run() {
  const producer = new Zmq.Push()

  await producer.bind("tcp://127.0.0.1:3000")
  console.log("Producer bound to port 3000")

  let counter = 0
  while (true) {
    await producer.send(`some work # ${counter++}`)
    await wait(500)
  }
}

run()
