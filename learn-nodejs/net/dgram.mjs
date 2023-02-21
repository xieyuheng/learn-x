import dgram from "node:dgram"

const socket = dgram.createSocket("udp4")

socket.on("message", (message, info) => {
  console.log({ message: message.toString(), info })
})

socket.bind(8080)
