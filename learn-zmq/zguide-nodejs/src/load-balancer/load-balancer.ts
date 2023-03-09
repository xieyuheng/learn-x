import * as Zmq from "zeromq"
import { wait } from "../utils/wait"

type State = {
  frontend: Zmq.Router
  backend: Zmq.Router
  workerQueue: Array<string>
}

async function run() {
  const frontend = new Zmq.Router()
  const backend = new Zmq.Router()

  const who = "load-balancer"

  const loadBalancerFrontend = "tcp://127.0.0.1:3000"
  const loadBalancerBackend = "tcp://127.0.0.1:3001"

  await frontend.bind(loadBalancerFrontend)
  await backend.bind(loadBalancerBackend)

  console.log({ who, message: "started" })

  const state: State = { frontend, backend, workerQueue: [] }

  handleResult(state)
  handleTask(state)
}

async function handleResult(state: State) {
  for await (const [workerId, kind, ...rest] of state.backend) {
    state.workerQueue.push(String(workerId))

    switch (String(kind)) {
      case "Ready": {
      }

      case "Result": {
        const [clientId, result] = rest
        await state.frontend.send([clientId, result])
      }
    }
  }
}

async function handleTask(state: State) {
  while (true) {
    const workerId = state.workerQueue.shift()
    if (workerId === undefined) {
      await wait(10)
      continue
    }

    const [clientId, task] = await state.frontend.receive()
    await state.backend.send([workerId, clientId, task])
  }
}

run()
