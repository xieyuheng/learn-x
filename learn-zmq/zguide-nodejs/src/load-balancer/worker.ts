import * as Zmq from "zeromq"
import { randomHexString } from "../utils/randomHexString"
import { wait } from "../utils/wait"

async function run() {
  const worker = new Zmq.Dealer()

  const who = "worker"
  const loadBalancerBackend = "tcp://127.0.0.1:3001"

  const id = `worker ${randomHexString(10)}`
  worker.routingId = id
  worker.connect(loadBalancerBackend)

  console.log({ who, message: "started", id })

  // Message format: [kind, ...rest]
  // - kind = "Ready" | "Result"

  await worker.send(["Ready"])

  console.log({
    who,
    id,
    message: "ready",
  })

  while (true) {
    const [clientId, task] = await worker.receive()

    console.log({
      who,
      id,
      message: "working on task",
      clientId: String(clientId),
      task: String(task),
    })

    await wait(300)

    const result = `${task}, result ${randomHexString(8)}`
    await worker.send(["Result", clientId, result])
  }
}

run()
