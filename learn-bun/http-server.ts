const server = Bun.serve({
  port: 0,
  fetch(req, server) {
    const ip = server.requestIP(req)
    return Response.json({ ip })
  },
})

console.log(server.url)
