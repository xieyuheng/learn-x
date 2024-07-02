#!/usr/bin/env bash

c="g++"
# c="clang++"

f="-Wall -foptimize-sibling-calls"
# f="-Wall -foptimize-sibling-calls -O2"

build ()
{
    time $c $f lego.cpp -o lego
}

test () {
    rm -f lego
    build
    time ./lego
}

build
