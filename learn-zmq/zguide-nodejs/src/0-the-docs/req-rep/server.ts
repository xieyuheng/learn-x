import * as Zmq from "zeromq"

async function run() {
  const sock = new Zmq.Reply()

  await sock.bind("tcp://127.0.0.1:3000")

  for await (const [msg] of sock) {
    await sock.send([msg, String(2 * Number(msg))])
  }
}

run()
