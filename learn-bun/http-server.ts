// Bun.serve({
//   fetch(request) {
//     console.log(request)
//     return Response.json({message: "Bun!"})
//     return new Response("Bun!")
//   },
// })

const x: numebr = 123

const server = Bun.serve({
  fetch(req, server) {
    const ip = server.requestIP(req);
    console.log(ip)
    return Response.json({x, ip});
  },
});

console.log(server.url);
console.log(server);
