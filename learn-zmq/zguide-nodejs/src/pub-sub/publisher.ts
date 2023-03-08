import * as Zmq from "zeromq"
import { wait } from "../utils/wait"

async function run() {
  const publisher = new Zmq.Publisher()

  await publisher.bind("tcp://127.0.0.1:3000")
  console.log("Publisher bound to port 3000")

  while (true) {
    console.log("sending a multipart message envelope")
    await publisher.send(["kitty cats", "meow!"])
    await wait(500)
  }
}

run()
