# Learn MongoDB

## Day 1: CRUD and Nesting

Get free MongoDB at:
- https://cloud.mongodb.com

Connect to db from shell:

``` sh
mongo "mongodb+srv://cluster-0.e4yi2.mongodb.net/<dbname>" --username xieyuheng
```

We will connect to a db called "book":

``` sh
mongo "mongodb+srv://cluster-0.e4yi2.mongodb.net/book" --username xieyuheng
```

In the shell:
- help -- to get help
- show dbs -- to list dbs
- use <dbname> -- to switch db

The three-level built-in hierarchy of mongodb:
- (1) db
- (2) collection
- (3) document

After connected to the db (named "book"),
inserting to non-existing db's non-existing collection
will create the whole hierarchy:

``` js
db.towns.insert({
  name: "New York",
  population: 22200000,
  lastCensus: ISODate("2016-07-01"),
  famousFor: [ "the MOMA", "food", "Derek Jeter" ],
  mayor : {
    name : "Bill de Blasio",
    party : "D"
  }
})
```

After insertion, the collection is created, we can see it by:
- show collections

We can find all documents in the collection by:

``` js
db.towns.find()
```
