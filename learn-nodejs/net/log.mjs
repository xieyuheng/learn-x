import net from "node:net"

const server = net.createServer((socket) => {
  console.log({
    localAddress: socket.localAddress,
    localPort: socket.localPort,
    localFamily: socket.localFamily,
    remoteAddress: socket.remoteAddress,
    remotePort: socket.remotePort,
    remoteFamily: socket.remoteFamily,
  })

  socket.write("Hi, I will log your messages to the server.")

  socket.on("data", (data) => {
    process.stdout.write(data.toString())
  })
})

server.listen({ port: 8080 }, () => {
  console.log({
    "server.address": server.address(),
  })
})
