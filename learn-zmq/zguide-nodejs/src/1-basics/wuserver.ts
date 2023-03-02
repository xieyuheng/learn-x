import * as Zmq from "zeromq"
import { randomNat } from "../utils/randomNat"

//  Weather update server
//  Binds PUB socket to tcp://*:5556
//  Publishes random weather updates

async function run() {
  const who = "wuserver"

  const publisher = new Zmq.Publisher()

  await publisher.bind("tcp://*:5556")

  while (true) {
    const zipcode = randomNat(100000)
    const temperature = randomNat(215) - 80
    const relhumidity = randomNat(50) + 10

    const update = `${zipcode} ${temperature} ${relhumidity}`
    await publisher.send(update)
    // NOTE `console.log` is slow.
    // console.log({ who, update })
  }
}

run()
