// #include <stdlib.h>
#include <stdio.h>
#include <stdbool.h>
// #include <string.h>

int main (int argc, char** argv) {
  '0'; // => 48 in the ASCII character set.
  'A'; // => 65 in the ASCII character set.

  bool disaster = true;

  printf("%d\n", disaster);

  // switch (argc) {
  // case 0: // labels need to be integral *constant* expressions (such as enums)
  //   printf("Hey, 'a' equals 0!\n");
  //   break; // if you don't break, control flow falls over labels
  // case 1:
  //   printf("Huh, 'a' equals 1!\n");
  //   break;
  //   // Be careful - without a "break", execution continues until the
  //   // next "break" is reached.
  // case 3:
  // case 4:
  //   printf("Look at that.. 'a' is either 3, or 4\n");
  //   break;
  // default:
  //   // if `some_integral_expression` didn't match any of the labels
  //   fputs("Error!\n", stderr);
  //   exit(-1);
  //   break;
  // }
}
