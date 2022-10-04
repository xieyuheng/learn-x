#!/usr/bin/awk -f

# https://learnxinyminutes.com/docs/awk

BEGIN {
  count = 0;

  if (count == 0) {
    print "Starting with count of 0";
  } else {
    print "Huh?";
  }
}

/^fo.*bar$/ {
  # default to print $0;
  print;

  # 0th field is the line
  print $0;

  # other fields
  print $1, $2;

  # Prints the number of fields on this line
  print NF;

  # Print the last field on this line
  print $NF;
}
