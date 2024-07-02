#include <iostream>
#include <vector>

using namespace std;

int main ()
{
    cout << "Just type a line. I'll repeat it six times!\n";

    string val;
    cin >> val;

    vector<string> my_vector;
    my_vector.push_back (val);
    my_vector.push_back (val);
    my_vector.push_back (val);
    my_vector.push_back (val);
    my_vector.push_back (val);
    my_vector.push_back (val);

    // for (int i = 0;
    //      i < my_vector.size ();
    //      i++)
    //     cout << my_vector[i] << endl;

    // vector<string>::iterator it;
    // for (it = my_vector.begin ();
    //      it != my_vector.end ();
    //      it++)
    //     cout << *it << endl;

    for (auto e : my_vector)
        cout << e << endl;

    cout << "size : " << my_vector.size () << "\n";
    my_vector.clear ();
    cout << "size : " << my_vector.size () << "\n";
}
