const db = require("./db")
const path = require("path")

const world = db.connect({
  user: "root",
  password: "forchange",
  host: "localhost",
  database: "world2",
})

async function main() {
  await world.run(path.resolve(__dirname, "countries/create.sql"))
  await world.run(path.resolve(__dirname, "countries/insert.sql"))

  await world.query(`SELECT * FROM countries;`, { log: true })
  await world.query(`DELETE FROM countries WHERE country_code = 'll';`)
  await world.query(`SELECT * FROM countries;`, { log: true })

  await world.run(path.resolve(__dirname, "cities/create.sql"))
  await world.run(path.resolve(__dirname, "cities/insert.sql"))

  await world.query(`SELECT * FROM cities;`, { log: true })

  await world.query(
    `UPDATE cities SET postal_code = '97205' WHERE name = 'Portland';`
  )

  await world.query(`SELECT * FROM cities;`, { log: true })

  await world.query(
    `
SELECT cities.*, country_name
FROM cities INNER JOIN countries
ON cities.country_code = countries.country_code;
`,
    { log: true }
  )

  await world.run(path.resolve(__dirname, "venues/create.sql"))
  await world.run(path.resolve(__dirname, "venues/insert.sql"))

  await world.query(
    `
SELECT venue.venue_id, venue.name, city.name
FROM venues venue INNER JOIN cities city
ON venue.postal_code = city.postal_code
AND venue.country_code = city.country_code;
`,
    { log: true }
  )

  await world.run(path.resolve(__dirname, "events/create.sql"))
  await world.run(path.resolve(__dirname, "events/insert.sql"))

  await world.query(
    `
SELECT e.title, v.name
FROM events e JOIN venues v
ON e.venue_id = v.venue_id;
`,
    { log: true }
  )

  await world.end()
}

main()
