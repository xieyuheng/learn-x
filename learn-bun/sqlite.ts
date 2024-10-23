import { Database } from "bun:sqlite"

const db = new Database(":memory:")
const query = db.query("select 'Hello world' as message;")
console.log(query.get()) // => { message: "Hello world" }
