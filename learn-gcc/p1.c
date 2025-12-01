#include <stdio.h>
#include <stdint.h>

uint64_t add(uint64_t x, uint64_t y) {
    return x + y;
}

int main() {
    uint64_t x = 1;
    uint64_t y = 2;
    uint64_t z = 3;
    return add(x, add(y, z));
}
