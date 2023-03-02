import * as Zmq from "zeromq"

//  Weather update client
//  Connects SUB socket to tcp://localhost:5556
//  Collects weather updates and finds avg temp in zipcode

async function run() {
  const who = "wuclient"

  const subscriber = new Zmq.Subscriber()

  subscriber.connect("tcp://localhost:5556")
  const zipcodeFilter = "10001"
  subscriber.subscribe(zipcodeFilter)

  let updateNbr = 0
  let totalTemp = 0
  for (updateNbr; updateNbr < 30; updateNbr++) {
    const [update] = await subscriber.receive()
    process.stdout.write("*")

    const updateText = update.toString()
    const [zipcode, temperature, relhumidity] = updateText.split(" ")
    totalTemp += Number(temperature)
  }

  console.log()

  const averageTemp = totalTemp / updateNbr

  console.log({ who, zipcodeFilter, averageTemp, updateNbr })
}

run()
