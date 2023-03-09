import type * as Zmq from "zeromq"

import { Header, Message } from "./types"

export class Service {
  private workers: Map<string, Buffer> = new Map()
  private requests: Array<[Buffer, Buffer[]]> = []

  constructor(private socket: Zmq.Router, private name: string) {}

  dispatchRequest(client: Buffer, ...req: Buffer[]) {
    this.requests.push([client, req])
    this.dispatchPending()
  }

  async dispatchReply(worker: Buffer, client: Buffer, ...rep: Buffer[]) {
    this.workers.set(worker.toString("hex"), worker)

    console.log(
      `dispatching '${this.name}' ` +
        `${client.toString("hex")} <- rep ${worker.toString("hex")}`,
    )

    await this.socket.send([client, null, Header.Client, this.name, ...rep])

    this.dispatchPending()
  }

  private async dispatchPending() {
    while (this.workers.size > 0 && this.requests.length > 0) {
      const [key, worker] = this.workers.entries().next().value!
      this.workers.delete(key)
      const [client, req] = this.requests.shift()!

      console.log(
        `dispatching '${this.name}' ` +
          `${client.toString("hex")} req -> ${worker.toString("hex")}`,
      )

      await this.socket.send([
        worker,
        null,
        Header.Worker,
        Message.Request,
        client,
        null,
        ...req,
      ])
    }
  }

  register(worker: Buffer) {
    console.log(
      `registered worker ${worker.toString("hex")} for '${this.name}'`,
    )
    this.workers.set(worker.toString("hex"), worker)
    this.dispatchPending()
  }

  deregister(worker: Buffer) {
    console.log(
      `deregistered worker ${worker.toString("hex")} for '${this.name}'`,
    )
    this.workers.delete(worker.toString("hex"))
    this.dispatchPending()
  }
}
