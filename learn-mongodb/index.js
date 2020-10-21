const { MongoClient } = require("mongodb")
const assert = require("assert")
const process = require("process")
const fs = require("fs")

async function main() {
  const uri = process.env.MONGODB_URI
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })

  await client.connect()
  console.log("[ok] connected successfully to server.")
  const db = client.db("book")
  const towns = db.collection("towns")
  const result = await towns.find().toArray()
  console.log(result)
  client.close()
}

main()
