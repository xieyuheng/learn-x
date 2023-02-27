import * as Zmq from "zeromq"

async function run() {
  const sock = new Zmq.Pull()

  sock.connect("tcp://127.0.0.1:3000")
  console.log("Worker connected to port 3000")

  for await (const [msg] of sock) {
    console.log("work: %s", msg.toString())
  }
}

run()
