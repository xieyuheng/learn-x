#include <iostream>
#include <cmath>

// clang++ filesystem.cpp -Wall -Wextra -std=c++17 -lstdc++fs; ./a.out
// g++ filesystem.cpp -Wall -Wextra -std=c++17 -lstdc++fs; ./a.out

using namespace std;

int
main ()
{
    cout << "abs(+3.0) = " << abs(+3.0) << '\n';
    cout << "abs(-3.0) = " << abs(-3.0) << '\n';
    cout << "pi = " << 3.1415926172310238192739239 << '\n';
    cout << "abs(-0.0) = " << abs(-0.0) << '\n';
    cout << "abs(-Inf) = " << abs(-INFINITY) << '\n';
}
