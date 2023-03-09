import { Dealer } from "zeromq"

import { Header, Message } from "./types"

export class Worker {
  service = ""
  private socket: Dealer = new Dealer()

  constructor(private address = "tcp://127.0.0.1:5555") {
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

  async process(...req: Buffer[]): Promise<Buffer[]> {
    return req
  }
}
