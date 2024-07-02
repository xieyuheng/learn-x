#include <iostream>

using namespace std;

struct person_t
{
    string name;
    string address;
    string phone;
    size_t mass;

    person_t ();
    person_t (string name,
              string address,
              string phone,
              size_t mass);

    void print ();
};

person_t::person_t ()
{
    this->mass = 0;
}

person_t::person_t (string name,
                    string address,
                    string phone,
                    size_t mass)
{
    this->name = name;
    this->address = address;
    this->phone = phone;
    this->mass = mass;
}

void person_t::print ()
{
    cout << "name : " << name << "\n"
         << "address : " << address << "\n"
         << "phone : " << phone << "\n"
         << "mass : " << mass << "\n"
         << "\n";
}

int main ()
{
    person_t anon = person_t ();
    anon.print ();

    person_t *xieyuheng =
        new person_t ("xieyuheng",
                      "nowhere",
                      "nophone",
                      60);
    xieyuheng->print ();

    person_t karel =
        person_t ("Karel",
                  "Rietveldlaan 37",
                  "542 6044",
                  70);
    karel.print ();

    return 6;
}
