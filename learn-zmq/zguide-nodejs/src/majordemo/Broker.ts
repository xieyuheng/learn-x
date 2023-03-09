import * as Zmq from "zeromq"
import { Service } from "./Service"
import { Header, Message } from "./types"

export class Broker {
  private socket = new Zmq.Router({
    sendHighWaterMark: 1,
    sendTimeout: 1,
  })

  private services: Map<string, Service> = new Map()
  private workers: Map<string, Buffer> = new Map()

  constructor(public address: string) {}

  async start() {
    console.log(`starting broker on ${this.address}`)
    await this.socket.bind(this.address)

    this.loop()
  }

  private async loop() {
    for await (const [sender, blank, header, ...rest] of this.socket) {
      switch (header.toString()) {
        case Header.Client:
          this.handleClient(sender, ...rest)
          break
        case Header.Worker:
          this.handleWorker(sender, ...rest)
          break
        default:
          console.error(`invalid message header: ${header}`)
      }
    }
  }

  async stop() {
    if (!this.socket.closed) {
      this.socket.close()
    }
  }

  private handleClient(client: Buffer, service?: Buffer, ...req: Buffer[]) {
    if (service) {
      this.dispatchRequest(client, service, ...req)
    }
  }

  private handleWorker(worker: Buffer, type?: Buffer, ...rest: Buffer[]) {
    switch (type && type.toString()) {
      case Message.Ready: {
        const [service] = rest
        this.register(worker, service)
        break
      }

      case Message.Reply: {
        const [client, blank, ...rep] = rest
        this.dispatchReply(worker, client, ...rep)
        break
      }

      case Message.Heartbeat:
        /* Heartbeats not implemented yet. */
        break

      case Message.Disconnect:
        this.deregister(worker)
        break

      default:
        console.error(`invalid worker message type: ${type}`)
    }
  }

  private register(worker: Buffer, service: Buffer) {
    this.setWorkerService(worker, service)
    this.getService(service).register(worker)
  }

  private dispatchRequest(client: Buffer, service: Buffer, ...req: Buffer[]) {
    this.getService(service).dispatchRequest(client, ...req)
  }

  private dispatchReply(worker: Buffer, client: Buffer, ...rep: Buffer[]) {
    const service = this.getWorkerService(worker)
    this.getService(service).dispatchReply(worker, client, ...rep)
  }

  private deregister(worker: Buffer) {
    const service = this.getWorkerService(worker)
    this.getService(service).deregister(worker)
  }

  private getService(name: Buffer): Service {
    const key = name.toString()
    if (this.services.has(key)) {
      return this.services.get(key)!
    } else {
      const service = new Service(this.socket, key)
      this.services.set(key, service)
      return service
    }
  }

  private getWorkerService(worker: Buffer): Buffer {
    return this.workers.get(worker.toString("hex"))!
  }

  private setWorkerService(worker: Buffer, service: Buffer) {
    this.workers.set(worker.toString("hex"), service)
  }
}
