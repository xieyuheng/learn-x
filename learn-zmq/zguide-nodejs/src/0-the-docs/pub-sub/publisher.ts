import * as Zmq from "zeromq"
import { wait } from "../../utils/wait"

async function run() {
  const sock = new Zmq.Publisher()

  await sock.bind("tcp://127.0.0.1:3000")
  console.log("Publisher bound to port 3000")

  while (true) {
    console.log("sending a multipart message envelope")
    await sock.send(["kitty cats", "meow!"])
    await wait(500)
  }
}

run()
