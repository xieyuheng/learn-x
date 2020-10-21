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

We can also connect without naming a db:

``` sh
mongo "mongodb+srv://cluster-0.e4yi2.mongodb.net" --username xieyuheng
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

To see methods and simple documentations on db and collection:

``` js
db.help()
db.towns.help()
```

We can define helper function to insert data:

``` js
function insertCity(name, population, lastCensus, famousFor, mayorInfo) {
  db.towns.insert({
    name: name,
    population: population,
    lastCensus: ISODate(lastCensus),
    famousFor: famousFor,
    mayor : mayorInfo
  });
}

insertCity("Punxsutawney", 6200, '2016-01-31', ["Punxsutawney Phil"], { name : "Richard Alexander" })
insertCity("Portland", 582000, '2016-09-20', ["beer", "food", "Portlandia"], { name : "Ted Wheeler", party : "D" })
```

We can call find with a filter and a field selector:

``` js
db.towns.find(
  { name : /^P/, population : { $lt : 10000 } },
  { _id: 0, name : 1, population : 1 }
)

const population_range = {
  $lt: 1000000,
  $gt: 10000
}

db.towns.find(
  { name : /^P/, population : population_range },
  { _id: 0, name : 1, population : 1 }
)

db.towns.find(
  { lastCensus : { $gte : ISODate('2016-06-01') } },
  { _id : 0, name: 1 }
)
```

You can query nested array data by matching exact values:

``` js
db.towns.find(
  { famousFor : 'food' },
  { _id : 0, name : 1, famousFor : 1 }
)

db.towns.find(
  { famousFor : /moma/i },
  { _id : 0, name : 1, famousFor : 1 }
)

db.towns.find(
  { famousFor : { $all : ['food', 'beer'] } },
  { _id : 0, name:1, famousFor:1 }
)

db.towns.find(
  { famousFor : { $nin : ['food', 'beer'] } },
  { _id : 0, name : 1, famousFor : 1 }
)
```
