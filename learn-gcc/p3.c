#include <stdio.h>
#include <stdint.h>

uint64_t add(uint64_t x, uint64_t y) {
    return x + y;
}

int main() {
    uint64_t x1 = 1;
    uint64_t x2 = 2;
    uint64_t x3 = 3;
    uint64_t x4 = 4;
    uint64_t x5 = 5;
    uint64_t x6 = 6;
    uint64_t x7 = 7;
    uint64_t x8 = 8;
    uint64_t x9 = 9;
    uint64_t x10 = 10;
    return add(x1,
               add(x2,
                   add(x3,
                       add(x4,
                           add(x5,
                               add(x6,
                                   add(x7,
                                       add(x8,
                                           add(x9, x10)))))))));
}
