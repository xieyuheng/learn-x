#include <iostream>

#include <filesystem>

// clang++ filesystem.cpp -Wall -Wextra -std=c++17 -lstdc++fs; ./a.out
//     g++ filesystem.cpp -Wall -Wextra -std=c++17 -lstdc++fs; ./a.out

using namespace std;

namespace fs = filesystem;

int
main ()
{
    fs::path current_dir = fs::current_path ();
    cout << "current_dir : " << current_dir << "\n";
    cout << "current_dir.string () : " << current_dir.string () << "\n";

    fs::path a_path = fs::path ("xyh");
    cout << "a_path : " << a_path << "\n";
    cout << "a_path.root_path () : " << a_path.root_path () << "\n";
}
