#include <iostream>
#include <map>

using namespace std;

void
test_pointer ()
{
    map<char, int> *my_map = new map<char, int>;

    my_map->insert (pair<char, int> ('A', 1));
    my_map->insert (pair<char, int> ('B', 2));
    my_map->insert (pair<char, int> ('C', 3));
    my_map->insert (pair<char, int> ('D', 4));
    my_map->insert (pair<char, int> ('E', 5));
    my_map->insert (pair<char, int> ('F', 6));
    my_map->insert (pair<char, int> ('G', 7));
    my_map->insert (pair<char, int> ('H', 8));
    my_map->insert (pair<char, int> ('I', 9));
    my_map->insert (pair<char, int> ('J', 10));
    my_map->insert (pair<char, int> ('K', 11));
    my_map->insert (pair<char, int> ('L', 12));
    my_map->insert (pair<char, int> ('M', 13));
    my_map->insert (pair<char, int> ('N', 14));
    my_map->insert (pair<char, int> ('O', 15));
    my_map->insert (pair<char, int> ('P', 16));
    my_map->insert (pair<char, int> ('Q', 17));
    my_map->insert (pair<char, int> ('R', 18));
    my_map->insert (pair<char, int> ('S', 19));
    my_map->insert (pair<char, int> ('T', 20));
    my_map->insert (pair<char, int> ('U', 21));
    my_map->insert (pair<char, int> ('V', 22));
    my_map->insert (pair<char, int> ('W', 23));
    my_map->insert (pair<char, int> ('X', 24));
    my_map->insert (pair<char, int> ('Y', 25));
    my_map->insert (pair<char, int> ('Z', 26));

    auto x = pair<char, int> ('x', 666);
    my_map->insert (x);

    map<char, int>::iterator it;
    for (it = my_map->begin ();
         it != my_map->end ();
         it++)
        cout << it->first << " : "
             << it->second << "\n";

    {
        auto it = my_map->find ('z');
        if (it == my_map->end ())
            cout << "not-found" << "\n";
        else {
            cout << "found:" << "\n";
            cout << it->first << " : "
                 << it->second << "\n";
        }
    }

    {
        auto it = my_map->find ('Z');
        if (it == my_map->end ())
            cout << "not-found" << "\n";
        else {
            cout << "found:" << "\n";
            cout << it->first << " : "
                 << it->second << "\n";
        }
    }

    my_map->clear ();

    delete my_map;

    cout << x.first
         << " : "
         << x.second
         << "\n";
}


void
test_normal ()
{
    auto my_map = map<char, int> ();

    my_map.insert (make_pair ('A', 1));
    my_map.insert (make_pair ('B', 2));
    my_map.insert (make_pair ('C', 3));
    my_map.insert (make_pair ('D', 4));
    my_map.insert (make_pair ('E', 5));
    my_map.insert (make_pair ('F', 6));
    my_map.insert (make_pair ('G', 7));
    my_map.insert (make_pair ('H', 8));
    my_map.insert (make_pair ('I', 9));
    my_map.insert (make_pair ('J', 10));
    my_map.insert (make_pair ('K', 11));
    my_map.insert (make_pair ('L', 12));
    my_map.insert (make_pair ('M', 13));
    my_map.insert (make_pair ('N', 14));
    my_map.insert (make_pair ('O', 15));
    my_map.insert (make_pair ('P', 16));
    my_map.insert (make_pair ('Q', 17));
    my_map.insert (make_pair ('R', 18));
    my_map.insert (make_pair ('S', 19));
    my_map.insert (make_pair ('T', 20));
    my_map.insert (make_pair ('U', 21));
    my_map.insert (make_pair ('V', 22));
    my_map.insert (make_pair ('W', 23));
    my_map.insert (make_pair ('X', 24));
    my_map.insert (make_pair ('Y', 25));
    my_map.insert (make_pair ('Z', 26));

    auto x = make_pair ('x', 666);
    my_map.insert (x);

    auto your_map = my_map;

    map<char, int>::iterator it;
    for (it = your_map.begin ();
         it != your_map.end ();
         it++)
        cout << it->first << " : "
             << it->second << "\n";

    for (it = my_map.begin ();
         it != my_map.end ();
         it++)
        cout << it->first << " : "
             << it->second << "\n";

    {
        auto it = my_map.find ('z');
        if (it == my_map.end ())
            cout << "not-found" << "\n";
        else {
            cout << "found:" << "\n";
            cout << it->first << " : "
                 << it->second << "\n";
        }
    }

    {
        auto it = my_map.find ('Z');
        if (it == my_map.end ())
            cout << "not-found" << "\n";
        else {
            cout << "found:" << "\n";
            cout << it->first << " : "
                 << it->second << "\n";
        }
    }

    my_map.clear ();

    cout << x.first
         << " : "
         << x.second
         << "\n";
}






int
main ()
{
    test_normal ();
    test_pointer ();
}
