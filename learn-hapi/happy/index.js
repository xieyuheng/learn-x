const Hapi = require("@hapi/hapi")

const init = async () => {
  const server = Hapi.server({
    port: 3000,
    host: "localhost",
  })

  server.route({
    method: "GET",
    path: "/",
    handler: async (request, h) => {
      return h.redirect("/hello")
    },
  })

  server.route({
    method: "GET",
    path: "/hello/{name?}",
    handler: async (request, h) => {
      const { name } = request.params
      return `Hello ${name}!`
    },
  })

  server.route({
    method: "GET",
    path: "/json/{name?}",
    handler: async (request, h) => {
      const { name } = request.params
      return { name }
    },
  })

  await server.start()
  console.log(server.info)
}

process.on("unhandledRejection", (err) => {
  console.log(err)
  process.exit(1)
})

init()
