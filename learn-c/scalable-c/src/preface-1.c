#include <czmq.h>

int main(void) {
  zlist_t *list = zlist_new();
  zlist_append(list, "apple");
  zlist_append(list, "orange");
  zlist_push(list, "grape");
  zlist_push(list, "tomato");
  printf("%zd: ", zlist_size(list));

  char *fruit = (char *) zlist_first(list);

  while (fruit) {
    printf("%s ", fruit);
    fruit = (char *) zlist_next(list);
  }

  puts("");
  zlist_destroy(&list);
  return 0;
}
