import * as Zmq from "zeromq"
import { getChar } from "../utils/getChar"
import { randomNat } from "../utils/randomNat"

//  Task ventilator
//  Binds PUSH socket to tcp://localhost:5557
//  Sends batch of tasks to workers via that socket

async function run() {
  const who = "taskvent"

  //  Socket to send messages on
  const sender = new Zmq.Push()
  await sender.bind("tcp://*:5557")

  //  Socket to send start of batch message on
  const sink = new Zmq.Push()
  sink.connect("tcp://127.0.0.1:5558")

  console.log("Press Enter when the workers are ready: ")
  await getChar()
  console.log("Sending tasks to workers...")

  //  The first message is "0" and signals start of batch
  await sink.send("0")

  //  Send 100 tasks
  let taskNbr = 0
  let totalMsec = 0 //  Total expected cost in msecs
  for (taskNbr; taskNbr < 100; taskNbr++) {
    //  Random workload from 1 to 100msecs
    const workload = randomNat(100) + 1
    totalMsec += workload
    await sender.send(String(workload))
  }

  console.log({ who, totalMsec })
}

run()
