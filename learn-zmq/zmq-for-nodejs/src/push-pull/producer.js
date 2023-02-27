import * as Zmq from "zeromq";

async function run(): Promise<void> {
  const sock = new Zmq.Push();

  await sock.bind("tcp://127.0.0.1:3000");
  console.log("Producer bound to port 3000");

  let counter = 0;
  while (true) {
    await sock.send(`some work # ${counter++}`);
    await new Promise((resolve) => setTimeout(resolve, 500));
  }
}

run();
