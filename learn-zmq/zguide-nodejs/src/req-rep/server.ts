import * as Zmq from "zeromq"

async function run() {
  const server = new Zmq.Reply()

  await server.bind("tcp://127.0.0.1:3000")

  for await (const [msg] of server) {
    await server.send([msg, String(2 * Number(msg))])
  }
}

run()
