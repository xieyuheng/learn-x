#include <iostream>

using namespace std;

template<int Y>
void print_message ()
{
    cout << "Learn C++ in " << Y << " minutes!" << endl;
}

template<>
void print_message<10> ()
{
    cout << "Learn C++ faster in only 10 minutes!" << endl;
}

int main()
{
    print_message<20> ();
    print_message<10> ();
}
