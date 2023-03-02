import * as Zmq from "zeromq"
import { wait } from "../utils/wait"

//  Task worker
//  Connects PULL socket to tcp://localhost:5557
//  Collects workloads from ventilator via that socket
//  Connects PUSH socket to tcp://localhost:5558
//  Sends results to sink via that socket

async function run() {
  const who = "taskwork"

  //  Socket to receive messages on
  const receiver = new Zmq.Pull()
  receiver.connect("tcp://127.0.0.1:5557")

  //  Socket to send messages to
  const sender = new Zmq.Push()
  sender.connect("tcp://127.0.0.1:5558")

  //  Process tasks forever
  while (true) {
    const [task] = await receiver.receive()
    const taskText = task.toString()
    console.log({ who, taskText }) //  Show progress
    await wait(Number(taskText))

    await sender.send("") //  Send results to sink
  }
}

run()
