#!/usr/bin/env bash

# https://learnxinyminutes.com/docs/bash

echo Hello world!

# Each command starts on a new line, or after a semicolon:
echo 'This is the first line'; echo 'This is the second line'

# Declaring a variable looks like this:
Variable="Some string"

# Using the variable:
echo $Variable # => Some string
echo "$Variable" # => Some string
echo '$Variable' # => $Variable

# Parameter expansion ${ }:
echo ${Variable} # => Some string

# String substitution in variables
echo ${Variable/Some/A} # => A string
# This will substitute the first occurrence of "Some" with "A"

# Substring from a variable
Length=7
echo ${Variable:0:Length} # => Some st
# This will return only the first 7 characters of the value
echo ${Variable: -5} # => tring
# This will return the last 5 characters (note the space before -5)

# String length
echo ${#Variable} # => 11

# Indirect expansion
OtherVariable="Variable"
echo ${!OtherVariable} # => Some String
# This will expand the value of OtherVariable

# Default value for variable
echo ${Foo:-"DefaultValueIfFooIsMissingOrEmpty"}
# => DefaultValueIfFooIsMissingOrEmpty

# Declare an array with 6 elements
array0=(one two three four five six)
# Print first element
echo $array0 # => "one"
# Print first element
echo ${array0[0]} # => "one"
# Print all elements
echo ${array0[@]} # => "one two three four five six"
# Print number of elements
echo ${#array0[@]} # => "6"
# Print number of characters in third element
echo ${#array0[2]} # => "5"
# Print 2 elements starting from fourth
echo ${array0[@]:3:2} # => "four five"
# Print all elements. Each of them on new line.
for i in "${array0[@]}"; do
    echo "$i"
done

# Brace Expansion { }
# Used to generate arbitrary strings
echo {1..10} # => 1 2 3 4 5 6 7 8 9 10
echo {a..z} # => a b c d e f g h i j k l m n o p q r s t u v w x y z
# This will output the range from the start value to the end value

# Built-in variables:
# There are some useful built-in variables, like
echo "Last program's return value: $?"
echo "Script's PID: $$"
echo "Number of arguments passed to script: $#"
echo "All arguments passed to script: $@"
echo "Script's arguments separated into different variables: $1 $2..."

echo "I'm in $(pwd)" # execs `pwd` and interpolates output
echo "I'm in $PWD" # interpolates the variable

# # Reading a value from input:
# echo "What's your name?"
# read Name # Note that we didn't need to declare a new variable
# echo Hello, $Name!

# if [ $Name != $USER ]
# then
#     echo "Your name isn't your username"
# else
#     echo "Your name is your username"
# fi

# # NOTE: if $Name is empty, bash sees the above condition as:
# if [ != $USER ]
# # which is invalid syntax
# # so the "safe" way to use potentially empty variables in bash is:
# if [ "$Name" != $USER ] ...
# # which, when $Name is empty, is seen by bash as:
# if [ "" != $USER ] ...
# # which works as expected

# There is also conditional execution
echo "Always executed" || echo "Only executed if first command fails"
# => Always executed
echo "Always executed" && echo "Only executed if first command does NOT fail"
# => Always executed
# => Only executed if first command does NOT fail

# A single ampersand & after a command runs it in the background. A background command's
# output is printed to the terminal, but it cannot read from the input.
echo "ls: $(ls)"
