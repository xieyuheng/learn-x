#include <iostream>

using namespace std;

struct vehicle_s
{
    size_t mass;
};

struct land_s: public vehicle_s
{
    size_t speed;
};

struct car_s: public land_s
{
    string brand_name;
};

int main ()
{
    car_s car;
    car.mass = 1200;
    car.speed = 145;
    car.brand_name = "ABC";

    cout << "mass : " << car.mass << "\n"
         << "speed : " << car.speed << "\n"
         << "brand_name : " << car.brand_name << "\n"
         << "\n";
}
