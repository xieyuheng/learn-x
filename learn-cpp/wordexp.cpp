#include <iostream>
#include <wordexp.h>

using namespace std;

int
main ()
{
    wordexp_t p;
    char** w;
    wordexp ("$PATH/xyz", &p, 0);
    w = p.we_wordv;
    for (size_t i=0; i<p.we_wordc;i++ ) cout << w[i] << endl;
    wordfree( &p );
    return 0;
}
