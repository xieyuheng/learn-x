const { promisify } = require("util")
const mysql = require("mysql2")
mysql.promise = require("mysql2/promise")
const fs = require("fs")

const name = "db1"

const connection = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "forchange",
})

connection.connect((err) => {
  if (err) {
    console.error("error connecting:" + err.stack)
    return
  }

  console.log(`connection start: ${connection.threadId}`)
})

connection.query("CREATE DATABASE IF NOT EXISTS ??;", [name], (err, result) => {
  if (err) {
    console.error("error connecting:" + err.stack)
    return
  }
})

connection.query("USE ??;", [name], (err, result) => {
  if (err) {
    console.error("error connecting:" + err.stack)
    return
  }
})

function query(stmt, { echo, log } = { echo: false, log: false }) {
  const queryAsync = promisify((stmt, cb) => {
    const q = connection.query(stmt, cb)
    if (echo) {
      console.log(q.stmt)
    }
  })
  const onerror = (error) => console.log(error.sqlMessage)
  return queryAsync(stmt)
    .then((result) => {
      if (log) {
        if (result instanceof Array) {
          for (const row of result) {
            console.log(JSON.parse(JSON.stringify(row)))
          }
        } else {
          console.log(result)
        }
      }
      return result
    })
    .catch(onerror)
}

function run(file, opts) {
  return fs.promises.readFile(file, "utf8").then((stmt) => query(stmt, opts))
}

function end() {
  const endAsync = promisify((cb) => connection.end(cb))
  const onfinally = () => console.log(`connection end: ${connection.threadId}`)
  return endAsync().finally(onfinally)
}

module.exports = {
  query,
  end,
  run,
}
