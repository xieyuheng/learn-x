const { MongoClient } = require("mongodb")
const assert = require("assert")
const process = require("process")
const fs = require("fs")

async function main() {
  const uri = process.env.MONGODB_CLUSTER_URI
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })

  client.connect((err) => {
    assert.equal(null, err)
    console.log("Connected successfully to server")
    const db = client.db("book")
    console.log(db.collection("towns"))
    client.close()
  })
}

main()
