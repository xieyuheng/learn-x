import * as Zmq from "zeromq"

async function run() {
  const subscriber = new Zmq.Subscriber()

  subscriber.connect("tcp://127.0.0.1:3000")
  subscriber.subscribe("kitty cats")
  console.log("Subscriber connected to port 3000")

  for await (const [topic, msg] of subscriber) {
    console.log(
      "received a message related to:",
      String(topic),
      "containing message:",
      String(msg),
    )
  }
}

run()
