#include <iostream>
#include <stack>

using namespace std;


void show_stack (stack<int> s)
{
    cout << " * " << s.size () << " * ";
    cout << " -top-> ";
    while (!s.empty ()) {
        cout << s.top () << " ";
        s.pop ();
    }
    cout << "\n";
}

int main ()
{
    stack<int> s;
    s.push (1);
    s.push (2);
    s.push (3);
    s.push (4);
    s.push (5);

    cout << "the stack : \n";
    show_stack (s);

    s.pop ();
    s.pop ();
    cout << "the stack after two pops : \n";
    show_stack (s);
}
