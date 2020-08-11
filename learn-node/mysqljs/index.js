const db = require("./db")

// TODO finish the example.

async function main() {
  // await db.exe("create_countries.sql")
  // await db.exe("insert_countries.sql")
  // await db.query(`SELECT * FROM countries;`, { log: true })
  // await db.query(`DELETE FROM countries WHERE country_code = 'll';`)
  // await db.query(`SELECT * FROM countries;`, { log: true })

  // await db.exe("create_cities.sql")
  // await db.exe("insert_cities.sql")
  // await db.query(`SELECT * FROM cities;`, { log: true })
  // await db.query(
  //   `UPDATE cities SET postal_code = '97205' WHERE name = 'Portland';`
  // )
  // await db.query(`SELECT * FROM cities;`, { log: true })

  await db.query(
    `
SELECT cities.*, country_name
FROM cities INNER JOIN countries
ON cities.country_code = countries.country_code;
`,
    { log: true }
  )

  await db.end()
}

main()
