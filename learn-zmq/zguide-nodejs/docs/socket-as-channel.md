---
title: Socket as channel
---

# BSD socket

A BSD socket connects two nodes.

To establish a BSD socket for `send` and `recv`:

- Server: `bind`, `listen`, `accept`
- Client: `connect`

The address of a server is like a channel,
which can be used by one server and many clients.

If a server disconnected, the clients can wait and retry,
upon reconnection, new socket will be created,
but the channel feels stable.
