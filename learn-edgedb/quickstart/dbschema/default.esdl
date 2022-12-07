module default {
  type Person {
    required property name -> str;
  }

  type Movie {
    required property title -> str;
    multi link actors -> Person;
  }
};
