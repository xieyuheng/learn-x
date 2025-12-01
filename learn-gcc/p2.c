#include <stdio.h>
#include <stdint.h>

uint64_t f(uint64_t x, uint64_t y) {
    uint64_t c = 100;
    return (x + y) * 100;
}

int main() {
    uint64_t x = 1;
    uint64_t y = 2;
    uint64_t z = 3;
    return f(x, f(y, z));
}
