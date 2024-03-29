//  UDP ping command
//  Model 3, uses abstract network interface

#include "interface.c"
#include <czmq.h>

int main(void) {
  interface_t *interface = interface_new();
  while (true) {
    zmsg_t *msg = interface_recv(interface);
    if (!msg)
      break; //  Interrupted
    zmsg_dump(msg);
  }
  interface_destroy(&interface);
  return 0;
}
