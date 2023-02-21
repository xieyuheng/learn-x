import net from "node:net"

const server = net.createServer((socket) => {
  socket.write("Hi, I will log your messages to the server.")

  socket.on("data", (data) => {
    process.stdout.write(data.toString())
  })
})

server.on("connection", (socket) => {
  console.log(socket.address())
})

server.listen({ port: 8080 }, () => {
  console.log(server.address())
})
