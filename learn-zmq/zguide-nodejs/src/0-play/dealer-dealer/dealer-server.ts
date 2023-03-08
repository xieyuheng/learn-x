import * as Zmq from "zeromq"

async function run() {
  const server = new Zmq.Dealer()

  const who = "dealer-server"
  const url = "tcp://127.0.0.1:3000"

  await server.bind(url)

  console.log({ who, url })

  for await (const [n] of server) {
    const squared = Number(n) * Number(n)
    await server.send([String(squared)])

    console.log({ who, n: Number(n), squared })
  }
}

run()
