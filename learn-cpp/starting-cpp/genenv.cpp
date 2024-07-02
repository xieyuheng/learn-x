#include <iostream>
#include <cstdlib>

using namespace std;

int main()
{
    if (const char* env_p = getenv ("PATH"))
        cout << "Your PATH is: " << env_p << '\n';
}
