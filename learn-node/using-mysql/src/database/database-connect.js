const { promisify } = require("util")
const mysql = require("mysql")
const fs = require("fs")

function connect(config) {
  const database = config.database

  const connection = mysql.createConnection({ ...config, database: undefined })

  connection.connect((err) => {
    if (err) {
      console.error("error connecting:" + err.stack)
      return
    }

    console.log(`connection start: ${connection.threadId}`)
  })

  connection.query(
    "CREATE DATABASE IF NOT EXISTS ??;",
    [database],
    (err, result) => {
      if (err) {
        console.error("error connecting:" + err.stack)
        return
      }
    }
  )

  connection.query("USE ??;", [database], (err, result) => {
    if (err) {
      console.error("error connecting:" + err.stack)
      return
    }
  })

  function query(stmt, { echo, log } = { echo: false, log: false }) {
    const queryAsync = promisify((stmt, cb) => {
      const q = stmt.file
        ? fs.promises
            .readFile(stmt.file, "utf8")
            .then((stmt) => connection.query(stmt, cb))
        : connection.query(stmt, cb)
      if (echo) {
        console.log(q.sql)
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

  function end() {
    const endAsync = promisify((cb) => connection.end(cb))
    const onfinally = () =>
      console.log(`connection end: ${connection.threadId}`)
    return endAsync().finally(onfinally)
  }

  return {
    query,
    end,
  }
}

module.exports = {
  connect,
}
