---
title: Socket as channel
---

# BSD socket

A BSD socket connects two nodes.

To establish a BSD socket for `send` and `recv`:

- Server: `bind`, `listen`, `accept`
- Client: `connect`

The endpoint of a server is like a channel,
which can be used by one server and many clients.

```
                server
                  |
========= endpoint as channel =========
  |       |       |       |       |
client  client  client  client  client
```

If a server disconnected, the clients can
wait and retry (require we write this kind of client code),
upon reconnection, new socket will be created,
but the channel feels stable.

# ZeroMQ socket

To establish a ZeroMQ socket for `send` and `recv`:

- Server: `bind`
- Client: `connect`

One ZeroMQ server can bind to many endpoints.

```
                     server
                       |
          -----------------------------
          |                           |
          |                           |
====== endpoint ======      ====== endpoint ======
  |       |       |           |       |       |
client  client  client      client  client  client
```

Sockets have types.
The socket type defines the semantics of the socket,
its policies for routing messages inwards and outwards, queuing, etc.

You can connect certain types of socket together,
e.g., a publisher socket and a subscriber socket.

Sockets work together in "messaging patterns".

ZeroMQ’s patterns are hard-coded
but future versions may allow user-definable patterns.

[Question] Can we use erlang actors to implement message patterns?
