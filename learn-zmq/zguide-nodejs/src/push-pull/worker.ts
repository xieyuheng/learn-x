import * as Zmq from "zeromq"

async function run() {
  const worker = new Zmq.Pull()

  worker.connect("tcp://127.0.0.1:3000")
  console.log("Worker connected to port 3000")

  for await (const [msg] of worker) {
    console.log("work: %s", msg.toString())
  }
}

run()
