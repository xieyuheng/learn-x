import * as Zmq from "zeromq"

//  Task sink
//  Binds PULL socket to tcp://localhost:5558
//  Collects results from workers via that socket

async function run() {
  const who = "tasksink"

  //  Socket to receive messages on
  const receiver = new Zmq.Pull()
  await receiver.bind("tcp://*:5558")

  //  Wait for start of batch
  await receiver.receive()

  const startTime = Date.now()

  //  Process 100 confirmations
  let taskNbr = 0
  for (taskNbr = 0; taskNbr < 100; taskNbr++) {
    const [result] = await receiver.receive()
    if (taskNbr % 10 == 0) {
      process.stdout.write(":")
    } else {
      process.stdout.write(".")
    }
  }

  console.log()

  //  Calculate and report duration of batch
  const elapsedTime = Date.now() - startTime
  console.log({ who, elapsedTime })
}

run()
