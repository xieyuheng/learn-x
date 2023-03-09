import * as Zmq from "zeromq"

import { Header, Message } from "./types"

export class Worker {
  private socket = new Zmq.Dealer()

  constructor(
    public address: string,
    public service: string,
    public process: (...req: Buffer[]) => Promise<Buffer[]>,
  ) {
    this.socket.connect(address)
  }

  async start() {
    await this.socket.send([null, Header.Worker, Message.Ready, this.service])

    this.loop()
  }

  private async loop() {
    for await (const [blank1, header, type, client, blank2, ...req] of this
      .socket) {
      const rep = await this.process(...req)
      try {
        await this.socket.send([
          null,
          Header.Worker,
          Message.Reply,
          client,
          null,
          ...rep,
        ])
      } catch (err) {
        console.error(`unable to send reply for ${this.address}`)
      }
    }
  }

  async stop() {
    if (!this.socket.closed) {
      await this.socket.send([
        null,
        Header.Worker,
        Message.Disconnect,
        this.service,
      ])
      this.socket.close()
    }
  }
}
