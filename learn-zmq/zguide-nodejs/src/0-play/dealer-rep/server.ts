import * as Zmq from "zeromq"

async function run() {
  const server = new Zmq.Reply()

  const who = "server"
  const url = "tcp://127.0.0.1:3000"

  await server.bind(url)

  console.log({ who, url })

  for await (const [msg] of server) {
    await server.send([msg, String(Number(msg) * Number(msg))])
  }
}

run()
