const util = require("util")
const child_process = require("child_process")
const exec = util.promisify(child_process.exec)
const execFile = util.promisify(child_process.execFile)
const fork = util.promisify(child_process.fork)
const spawn = util.promisify(child_process.spawn)
const process = require("process")
const path = require("path")
const fs = require("fs")

async function main() {
  try {
    const { stdout } = await exec("cle")
    await fs.promises.writeFile("output.txt", stdout)
    const text = await fs.promises.readFile("output.txt", { encoding: "utf-8" })
    console.log("output.txt:", text)
  } catch (error) {
    console.log(`error.stdout: ${error.stdout}`)
    console.log(`error.stderr: ${error.stderr}`)
    process.exit(1)
  }
}

// function main() {
//   exec("cle")
//     .catch((error) => {
//       console.log(`error.stdout: ${error.stdout}`)
//       console.log(`error.stderr: ${error.stderr}`)
//       process.exit(1)
//     })
//     .then((the) => {
//       fs.promises.writeFile("output.txt", the.stdout)
//     })
//     .then(() => {
//       fs.promises.readFile("output.txt", { encoding: "utf-8" }).then((text) => {
//         console.log("output.txt:", text)
//       })
//     })
// }

main()
