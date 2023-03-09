import * as Zmq from "zeromq"
import { randomHexString } from "../utils/randomHexString"
import { wait } from "../utils/wait"

async function run() {
  const client = new Zmq.Dealer()

  const who = "client"
  const loadBalancerFrontend = "tcp://127.0.0.1:3000"

  const id = `client ${randomHexString(10)}`
  client.routingId = id
  client.connect(loadBalancerFrontend)

  console.log({ who, message: "started", id })

  while (true) {
    const task = `task ${randomHexString(6)}`
    await client.send(task)

    const [result] = await client.receive()

    console.log({ who, id, result: String(result) })

    await wait(1000)
  }
}

run()
