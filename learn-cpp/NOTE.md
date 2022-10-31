https://stackoverflow.com/questions/10789740/passing-stdstring-by-value-or-reference

1. Using the string as an id (will not be modified). Passing it in by
   const reference is probably the best idea here: (std::string const&)

2. Modifying the string but not wanting the caller to see that
   change. Passing it in by value is preferable: (std::string)

3. Modifying the string but wanting the caller to see that
  change. Passing it in by reference is preferable: (std::string &)

4. Sending the string into the function and the caller of the function
  will never use the string again. Using move semantics might be an
  option (std::string &&)
