//  kvmsg class - key-value message class for example applications

#include "kvmsg.h"
#include "zlist.h"
#include <uuid/uuid.h>

//  Keys are short strings
#define KVMSG_KEY_MAX 255

//  Message is formatted on wire as 5 frames:
//  frame 0: key (0MQ string)
//  frame 1: sequence (8 bytes, network order)
//  frame 2: uuid (blob, 16 bytes)
//  frame 3: properties (0MQ string)
//  frame 4: body (blob)
#define FRAME_KEY 0
#define FRAME_SEQ 1
#define FRAME_UUID 2
#define FRAME_PROPS 3
#define FRAME_BODY 4
#define KVMSG_FRAMES 5

//  Structure of our class
struct _kvmsg {
  //  Presence indicators for each frame
  int present[KVMSG_FRAMES];
  //  Corresponding 0MQ message frames, if any
  zmq_msg_t frame[KVMSG_FRAMES];
  //  Key, copied into safe C string
  char key[KVMSG_KEY_MAX + 1];
  //  List of properties, as name=value strings
  zlist_t *props;
  size_t props_size;
};

//  .split property encoding
//  These two helpers serialize a list of properties to and from a
//  message frame:

static void s_encode_props(kvmsg_t *self) {
  zmq_msg_t *msg = &self->frame[FRAME_PROPS];
  if (self->present[FRAME_PROPS])
    zmq_msg_close(msg);

  zmq_msg_init_size(msg, self->props_size);
  char *prop = zlist_first(self->props);
  char *dest = (char *)zmq_msg_data(msg);
  while (prop) {
    strcpy(dest, prop);
    dest += strlen(prop);
    *dest++ = '\n';
    prop = zlist_next(self->props);
  }
  self->present[FRAME_PROPS] = 1;
}

static void s_decode_props(kvmsg_t *self) {
  zmq_msg_t *msg = &self->frame[FRAME_PROPS];
  self->props_size = 0;
  while (zlist_size(self->props))
    free(zlist_pop(self->props));

  size_t remainder = zmq_msg_size(msg);
  char *prop = (char *)zmq_msg_data(msg);
  char *eoln = memchr(prop, '\n', remainder);
  while (eoln) {
    *eoln = 0;
    zlist_append(self->props, strdup(prop));
    self->props_size += strlen(prop) + 1;
    remainder -= strlen(prop) + 1;
    prop = eoln + 1;
    eoln = memchr(prop, '\n', remainder);
  }
}

//  .split constructor and destructor
//  Here are the constructor and destructor for the class:

//  Constructor, takes a sequence number for the new kvmsg instance:
kvmsg_t *kvmsg_new(int64_t sequence) {
  kvmsg_t *self;

  self = (kvmsg_t *)zmalloc(sizeof(kvmsg_t));
  self->props = zlist_new();
  kvmsg_set_sequence(self, sequence);
  return self;
}

//  zhash_free_fn callback helper that does the low level destruction:
void kvmsg_free(void *ptr) {
  if (ptr) {
    kvmsg_t *self = (kvmsg_t *)ptr;
    //  Destroy message frames if any
    int frame_nbr;
    for (frame_nbr = 0; frame_nbr < KVMSG_FRAMES; frame_nbr++)
      if (self->present[frame_nbr])
        zmq_msg_close(&self->frame[frame_nbr]);

    //  Destroy property list
    while (zlist_size(self->props))
      free(zlist_pop(self->props));
    zlist_destroy(&self->props);

    //  Free object itself
    free(self);
  }
}

//  Destructor
void kvmsg_destroy(kvmsg_t **self_p) {
  assert(self_p);
  if (*self_p) {
    kvmsg_free(*self_p);
    *self_p = NULL;
  }
}

//  .split recv method
//  This method reads a key-value message from the socket and returns a
//  new {{kvmsg}} instance:

kvmsg_t *kvmsg_recv(void *socket) {
  //  This method is almost unchanged from kvsimple
  //  .skip
  assert(socket);
  kvmsg_t *self = kvmsg_new(0);

  //  Read all frames off the wire, reject if bogus
  int frame_nbr;
  for (frame_nbr = 0; frame_nbr < KVMSG_FRAMES; frame_nbr++) {
    if (self->present[frame_nbr])
      zmq_msg_close(&self->frame[frame_nbr]);
    zmq_msg_init(&self->frame[frame_nbr]);
    self->present[frame_nbr] = 1;
    if (zmq_msg_recv(&self->frame[frame_nbr], socket, 0) == -1) {
      kvmsg_destroy(&self);
      break;
    }
    //  Verify multipart framing
    int rcvmore = (frame_nbr < KVMSG_FRAMES - 1) ? 1 : 0;
    if (zsocket_rcvmore(socket) != rcvmore) {
      kvmsg_destroy(&self);
      break;
    }
  }
  //  .until
  if (self)
    s_decode_props(self);
  return self;
}

//  Send key-value message to socket; any empty frames are sent as such.
void kvmsg_send(kvmsg_t *self, void *socket) {
  assert(self);
  assert(socket);

  s_encode_props(self);
  //  The rest of the method is unchanged from kvsimple
  //  .skip
  int frame_nbr;
  for (frame_nbr = 0; frame_nbr < KVMSG_FRAMES; frame_nbr++) {
    zmq_msg_t copy;
    zmq_msg_init(&copy);
    if (self->present[frame_nbr])
      zmq_msg_copy(&copy, &self->frame[frame_nbr]);
    zmq_msg_send(&copy, socket,
                 (frame_nbr < KVMSG_FRAMES - 1) ? ZMQ_SNDMORE : 0);
    zmq_msg_close(&copy);
  }
}
//  .until

//  .split dup method
//  This method duplicates a {{kvmsg}} instance, returns the new instance:

kvmsg_t *kvmsg_dup(kvmsg_t *self) {
  kvmsg_t *kvmsg = kvmsg_new(0);
  int frame_nbr;
  for (frame_nbr = 0; frame_nbr < KVMSG_FRAMES; frame_nbr++) {
    if (self->present[frame_nbr]) {
      zmq_msg_t *src = &self->frame[frame_nbr];
      zmq_msg_t *dst = &kvmsg->frame[frame_nbr];
      zmq_msg_init_size(dst, zmq_msg_size(src));
      memcpy(zmq_msg_data(dst), zmq_msg_data(src), zmq_msg_size(src));
      kvmsg->present[frame_nbr] = 1;
    }
  }
  kvmsg->props_size = zlist_size(self->props);
  char *prop = (char *)zlist_first(self->props);
  while (prop) {
    zlist_append(kvmsg->props, strdup(prop));
    prop = (char *)zlist_next(self->props);
  }
  return kvmsg;
}

//  The key, sequence, body, and size methods are the same as in kvsimple.
//  .skip

//  Return key from last read message, if any, else NULL
char *kvmsg_key(kvmsg_t *self) {
  assert(self);
  if (self->present[FRAME_KEY]) {
    if (!*self->key) {
      size_t size = zmq_msg_size(&self->frame[FRAME_KEY]);
      if (size > KVMSG_KEY_MAX)
        size = KVMSG_KEY_MAX;
      memcpy(self->key, zmq_msg_data(&self->frame[FRAME_KEY]), size);
      self->key[size] = 0;
    }
    return self->key;
  } else
    return NULL;
}

//  Set message key as provided
void kvmsg_set_key(kvmsg_t *self, char *key) {
  assert(self);
  zmq_msg_t *msg = &self->frame[FRAME_KEY];
  if (self->present[FRAME_KEY])
    zmq_msg_close(msg);
  zmq_msg_init_size(msg, strlen(key));
  memcpy(zmq_msg_data(msg), key, strlen(key));
  self->present[FRAME_KEY] = 1;
}

//  Set message key using printf format
void kvmsg_fmt_key(kvmsg_t *self, char *format, ...) {
  char value[KVMSG_KEY_MAX + 1];
  va_list args;

  assert(self);
  va_start(args, format);
  vsnprintf(value, KVMSG_KEY_MAX, format, args);
  va_end(args);
  kvmsg_set_key(self, value);
}

//  Return sequence nbr from last read message, if any
int64_t kvmsg_sequence(kvmsg_t *self) {
  assert(self);
  if (self->present[FRAME_SEQ]) {
    assert(zmq_msg_size(&self->frame[FRAME_SEQ]) == 8);
    byte *source = zmq_msg_data(&self->frame[FRAME_SEQ]);
    int64_t sequence =
        ((int64_t)(source[0]) << 56) + ((int64_t)(source[1]) << 48) +
        ((int64_t)(source[2]) << 40) + ((int64_t)(source[3]) << 32) +
        ((int64_t)(source[4]) << 24) + ((int64_t)(source[5]) << 16) +
        ((int64_t)(source[6]) << 8) + (int64_t)(source[7]);
    return sequence;
  } else
    return 0;
}

//  Set message sequence number
void kvmsg_set_sequence(kvmsg_t *self, int64_t sequence) {
  assert(self);
  zmq_msg_t *msg = &self->frame[FRAME_SEQ];
  if (self->present[FRAME_SEQ])
    zmq_msg_close(msg);
  zmq_msg_init_size(msg, 8);

  byte *source = zmq_msg_data(msg);
  source[0] = (byte)((sequence >> 56) & 255);
  source[1] = (byte)((sequence >> 48) & 255);
  source[2] = (byte)((sequence >> 40) & 255);
  source[3] = (byte)((sequence >> 32) & 255);
  source[4] = (byte)((sequence >> 24) & 255);
  source[5] = (byte)((sequence >> 16) & 255);
  source[6] = (byte)((sequence >> 8) & 255);
  source[7] = (byte)((sequence)&255);

  self->present[FRAME_SEQ] = 1;
}

//  Return body from last read message, if any, else NULL
byte *kvmsg_body(kvmsg_t *self) {
  assert(self);
  if (self->present[FRAME_BODY])
    return (byte *)zmq_msg_data(&self->frame[FRAME_BODY]);
  else
    return NULL;
}

//  Set message body
void kvmsg_set_body(kvmsg_t *self, byte *body, size_t size) {
  assert(self);
  zmq_msg_t *msg = &self->frame[FRAME_BODY];
  if (self->present[FRAME_BODY])
    zmq_msg_close(msg);
  self->present[FRAME_BODY] = 1;
  zmq_msg_init_size(msg, size);
  memcpy(zmq_msg_data(msg), body, size);
}

//  Set message body using printf format
void kvmsg_fmt_body(kvmsg_t *self, char *format, ...) {
  char value[255 + 1];
  va_list args;

  assert(self);
  va_start(args, format);
  vsnprintf(value, 255, format, args);
  va_end(args);
  kvmsg_set_body(self, (byte *)value, strlen(value));
}

//  Return body size from last read message, if any, else zero
size_t kvmsg_size(kvmsg_t *self) {
  assert(self);
  if (self->present[FRAME_BODY])
    return zmq_msg_size(&self->frame[FRAME_BODY]);
  else
    return 0;
}
//  .until

//  .split UUID methods
//  These methods get and set the UUID for the key-value message:

byte *kvmsg_uuid(kvmsg_t *self) {
  assert(self);
  if (self->present[FRAME_UUID] &&
      zmq_msg_size(&self->frame[FRAME_UUID]) == sizeof(uuid_t))
    return (byte *)zmq_msg_data(&self->frame[FRAME_UUID]);
  else
    return NULL;
}

//  Sets the UUID to a randomly generated value
void kvmsg_set_uuid(kvmsg_t *self) {
  assert(self);
  zmq_msg_t *msg = &self->frame[FRAME_UUID];
  uuid_t uuid;
  uuid_generate(uuid);
  if (self->present[FRAME_UUID])
    zmq_msg_close(msg);
  zmq_msg_init_size(msg, sizeof(uuid));
  memcpy(zmq_msg_data(msg), uuid, sizeof(uuid));
  self->present[FRAME_UUID] = 1;
}

//  .split property methods
//  These methods get and set a specified message property:

//  Get message property, return "" if no such property is defined.
char *kvmsg_get_prop(kvmsg_t *self, char *name) {
  assert(strchr(name, '=') == NULL);
  char *prop = zlist_first(self->props);
  size_t namelen = strlen(name);
  while (prop) {
    if (strlen(prop) > namelen && memcmp(prop, name, namelen) == 0 &&
        prop[namelen] == '=')
      return prop + namelen + 1;
    prop = zlist_next(self->props);
  }
  return "";
}

//  Set message property. Property name cannot contain '='. Max length of
//  value is 255 chars.
void kvmsg_set_prop(kvmsg_t *self, char *name, char *format, ...) {
  assert(strchr(name, '=') == NULL);

  char value[255 + 1];
  va_list args;
  assert(self);
  va_start(args, format);
  vsnprintf(value, 255, format, args);
  va_end(args);

  //  Allocate name=value string
  char *prop = malloc(strlen(name) + strlen(value) + 2);

  //  Remove existing property if any
  sprintf(prop, "%s=", name);
  char *existing = zlist_first(self->props);
  while (existing) {
    if (memcmp(prop, existing, strlen(prop)) == 0) {
      self->props_size -= strlen(existing) + 1;
      zlist_remove(self->props, existing);
      free(existing);
      break;
    }
    existing = zlist_next(self->props);
  }
  //  Add new name=value property string
  strcat(prop, value);
  zlist_append(self->props, prop);
  self->props_size += strlen(prop) + 1;
}

//  .split store method
//  This method stores the key-value message into a hash map, unless
//  the key and value are both null. It nullifies the {{kvmsg}} reference
//  so that the object is owned by the hash map, not the caller:

void kvmsg_store(kvmsg_t **self_p, zhash_t *hash) {
  assert(self_p);
  if (*self_p) {
    kvmsg_t *self = *self_p;
    assert(self);
    if (kvmsg_size(self)) {
      if (self->present[FRAME_KEY] && self->present[FRAME_BODY]) {
        zhash_update(hash, kvmsg_key(self), self);
        zhash_freefn(hash, kvmsg_key(self), kvmsg_free);
      }
    } else
      zhash_delete(hash, kvmsg_key(self));

    *self_p = NULL;
  }
}

//  .split dump method
//  This method extends the {{kvsimple}} implementation with support for
//  message properties:

void kvmsg_dump(kvmsg_t *self) {
  //  .skip
  if (self) {
    if (!self) {
      fprintf(stderr, "NULL");
      return;
    }
    size_t size = kvmsg_size(self);
    byte *body = kvmsg_body(self);
    fprintf(stderr, "[seq:%" PRId64 "]", kvmsg_sequence(self));
    fprintf(stderr, "[key:%s]", kvmsg_key(self));
    //  .until
    fprintf(stderr, "[size:%zd] ", size);
    if (zlist_size(self->props)) {
      fprintf(stderr, "[");
      char *prop = zlist_first(self->props);
      while (prop) {
        fprintf(stderr, "%s;", prop);
        prop = zlist_next(self->props);
      }
      fprintf(stderr, "]");
    }
    //  .skip
    int char_nbr;
    for (char_nbr = 0; char_nbr < size; char_nbr++)
      fprintf(stderr, "%02X", body[char_nbr]);
    fprintf(stderr, "\n");
  } else
    fprintf(stderr, "NULL message\n");
}
//  .until

//  .split test method
//  This method is the same as in {{kvsimple}} with added support
//  for the uuid and property features of {{kvmsg}}:

int kvmsg_test(int verbose) {
  //  .skip
  kvmsg_t *kvmsg;

  printf(" * kvmsg: ");

  //  Prepare our context and sockets
  zctx_t *ctx = zctx_new();
  void *output = zsocket_new(ctx, ZMQ_DEALER);
  int rc = zmq_bind(output, "ipc://kvmsg_selftest.ipc");
  assert(rc == 0);
  void *input = zsocket_new(ctx, ZMQ_DEALER);
  rc = zmq_connect(input, "ipc://kvmsg_selftest.ipc");
  assert(rc == 0);

  zhash_t *kvmap = zhash_new();

  //  .until
  //  Test send and receive of simple message
  kvmsg = kvmsg_new(1);
  kvmsg_set_key(kvmsg, "key");
  kvmsg_set_uuid(kvmsg);
  kvmsg_set_body(kvmsg, (byte *)"body", 4);
  if (verbose)
    kvmsg_dump(kvmsg);
  kvmsg_send(kvmsg, output);
  kvmsg_store(&kvmsg, kvmap);

  kvmsg = kvmsg_recv(input);
  if (verbose)
    kvmsg_dump(kvmsg);
  assert(streq(kvmsg_key(kvmsg), "key"));
  kvmsg_store(&kvmsg, kvmap);

  //  Test send and receive of message with properties
  kvmsg = kvmsg_new(2);
  kvmsg_set_prop(kvmsg, "prop1", "value1");
  kvmsg_set_prop(kvmsg, "prop2", "value1");
  kvmsg_set_prop(kvmsg, "prop2", "value2");
  kvmsg_set_key(kvmsg, "key");
  kvmsg_set_uuid(kvmsg);
  kvmsg_set_body(kvmsg, (byte *)"body", 4);
  assert(streq(kvmsg_get_prop(kvmsg, "prop2"), "value2"));
  if (verbose)
    kvmsg_dump(kvmsg);
  kvmsg_send(kvmsg, output);
  kvmsg_destroy(&kvmsg);

  kvmsg = kvmsg_recv(input);
  if (verbose)
    kvmsg_dump(kvmsg);
  assert(streq(kvmsg_key(kvmsg), "key"));
  assert(streq(kvmsg_get_prop(kvmsg, "prop2"), "value2"));
  kvmsg_destroy(&kvmsg);
  //  .skip
  //  Shutdown and destroy all objects
  zhash_destroy(&kvmap);
  zctx_destroy(&ctx);

  printf("OK\n");
  return 0;
}
//  .until
