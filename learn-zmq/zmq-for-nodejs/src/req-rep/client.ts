import * as Zmq from "zeromq"

async function run() {
  const sock = new Zmq.Request()

  sock.connect("tcp://127.0.0.1:3000")
  console.log("Producer bound to port 3000")

  await sock.send("4")

  {
    const [result] = await sock.receive()
    console.log(String(result))
  }

  await sock.send("4")

  {
    const [result] = await sock.receive()
    console.log(String(result))
  }

  {
    // TODO How about double send?

    await sock.send("4")
    await sock.send("4")

    {
      const [result] = await sock.receive()
      console.log(String(result))
    }

    {
      const [result] = await sock.receive()
      console.log(String(result))
    }
  }
}

run()
