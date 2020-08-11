/* NOTE We start mysql in docker by the following commands:

   docker rm -f mysql
   docker run --name mysql -p 3306:3306 -e MYSQL_ROOT_PASSWORD=forchange -d mysql:5.7
*/

const mysql = require("mysql")

const connection = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "forchange",
})

connection.connect((err) => {
  if (err) {
    console.error("error connecting: " + err.stack)
    return
  }

  console.log(`connection start: ${connection.threadId}`)
})

connection.query("SELECT 1 + 1 AS solution", (err, rows, fields) => {
  if (err) throw err
  console.log("The rows:", rows)
})

connection.end((err) => {
  if (err) {
    console.error("error ending: " + err.stack)
    return
  }

  console.log(`connection end: ${connection.threadId}`)
})
