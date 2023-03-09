import * as Zmq from "zeromq"
import { wait } from "../utils/wait"
import { Broker } from "./Broker"
import { Worker } from "./Worker"

/**

   Code taken from:

   - https://github.com/zeromq/zeromq.js/tree/master/examples/majordomo

   This is an example broker implementation that partially implements
   [7/MDP](https://rfc.zeromq.org/spec:7/MDP/). Notably, the broker and
   workers do not send or listen to heartbeats.

**/

const broker = new Broker("tcp://127.0.0.1:5555")

const workers = [
  new Worker("tcp://127.0.0.1:5555", "tea", async (...msgs) => {
    await wait(Math.random() * 500)
    return msgs
  }),
  new Worker("tcp://127.0.0.1:5555", "coffee", async (...msgs) => {
    await wait(Math.random() * 200)
    return msgs
  }),
  new Worker("tcp://127.0.0.1:5555", "tea", async (...msgs) => {
    await wait(Math.random() * 500)
    return msgs
  }),
]

async function main() {
  for (const worker of workers) {
    await worker.start()
  }

  await broker.start()

  await Promise.all([
    request("soda", "cola"),
    request("tea", "oolong"),
    request("tea", "sencha"),
    request("tea", "earl grey", "with milk"),
    request("tea", "jasmine"),
    request("coffee", "cappuccino"),
    request("coffee", "latte", "with soy milk"),
    request("coffee", "espresso"),
    request("coffee", "irish coffee"),
  ])

  for (const worker of workers) {
    await worker.stop()
  }

  await broker.stop()
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})

async function request(
  service: string,
  ...req: string[]
): Promise<undefined | Buffer[]> {
  const socket = new Zmq.Request({ receiveTimeout: 2000 })
  socket.connect(broker.address)

  console.log(`requesting '${req.join(", ")}' from '${service}'`)
  await socket.send(["MDPC01", service, ...req])

  try {
    const [blank, header, ...res] = await socket.receive()
    console.log(`received '${res.join(", ")}' from '${service}'`)
    return res
  } catch (err) {
    console.log(`timeout expired waiting for '${service}'`)
  }
}
