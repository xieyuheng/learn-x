const Hapi = require("@hapi/hapi")

const init = async () => {
  const server = Hapi.server({
    port: 3000,
    host: "localhost",
  })

  server.route({
    method: "GET",
    path: "/",
    handler: (request, h) => h.redirect("/hello"),
  })

  server.route({
    method: "GET",
    path: "/hello/{name?}",
    handler: (request, h) => {
      const { name } = request.params
      return `Hello ${name}!`
    },
  })

  server.route({
    method: "GET",
    path: "/json/{name?}",
    handler: (request, h) => {
      const { name } = request.params
      return { name }
    },
  })

  server.route({
    method: "GET",
    path: "/user",
    handler: (request, h) => {
      return {
        firstName: "John",
        lastName: "Doe",
        userName: "JohnDoe",
        id: 123,
      }
    },
  })

  server.route({
    method: "POST",
    path: "/hello",
    handler: (request) => {
      const { name } = request.payload
      console.log(request.payload)
      return {
        message: `Hello ${name}`,
      }
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
