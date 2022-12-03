---
title: surreal notes
---

[question] How to start the db?

surreal start --log debug --user root --pass root memory

[question] How to persist data?

surreal start --log debug --user root --pass root file:///home/xyh/surrealdb/test.db

# SurrealQL

The query language can use `<table>/<id>` as identifier to reference record.

```
CREATE companies/surrealdb CONTENT {
  name: 'SurrealDB',
  cofounders: [persons/tobie, persons/jaime],
}
```

The dot syntax is overloaded to array,
to automaticly change `Array<Record<...>>`
to `Record<Array<...>>`.

```
CREATE person:jaime SET name = 'Jaime', friends = [person:tobie, person:simon];
CREATE person:tobie SET name = 'Tobie', friends = [person:simon, person:marcus];
CREATE person:simon SET name = 'Simon', friends = [person:jaime, person:tobie];
CREATE person:marcus SET name = 'Marcus', friends = [person:tobie];

SELECT friends.name FROM person:tobie;

[
  {
    friends: {
      name: ["Simon", "Marcus"]
    }
  }
]
```
