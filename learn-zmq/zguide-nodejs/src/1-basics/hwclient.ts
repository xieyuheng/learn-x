import * as Zmq from "zeromq"

async function run() {
  const who = "hwclient"

  const requester = new Zmq.Request()

  requester.connect("tcp://127.0.0.1:5555")

  for (let requestNbr = 0; requestNbr < 10; requestNbr++) {
    const requestText = String(requestNbr)
    await requester.send(requestText)
    console.log({ who, requestText })

    const [reply] = await requester.receive()
    const replyText = reply.toString()
    console.log({ who, replyText })
  }
}

run()
