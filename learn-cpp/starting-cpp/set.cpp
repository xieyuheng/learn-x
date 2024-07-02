#include <iostream>
#include <set>

using namespace std;

int main ()
{
    set<int> my_set;
    my_set.insert (30);
    my_set.insert (10);
    my_set.insert (20);
    my_set.insert (30);

    cout << "size : " << my_set.size () << "\n";

    my_set.erase (20);

    cout << "size : " << my_set.size () << "\n";

    // set<int>::iterator it;
    // for (it = my_set.begin ();
    //      it != my_set.end ();
    //      it++)
    //     cout << *it << endl;

    for (auto e: my_set)
        cout << e << endl;

    cout << "size : " << my_set.size () << "\n";

    my_set.clear ();

    cout << "size : " << my_set.size () << "\n";
}
