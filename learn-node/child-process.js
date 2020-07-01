#!/usr/bin/env node

const util = require("util")
const child_process = require("child_process")
const exec = util.promisify(child_process.exec)
const execFile = util.promisify(child_process.execFile)
const fork = util.promisify(child_process.fork)
const spawn = child_process.spawn
const process = require("process")
const path = require("path")
const fs = require("fs")

async function p1() {
  try {
    const { stdout } = await exec("ls")
    await fs.promises.writeFile("output.txt", stdout)
    const text = await fs.promises.readFile("output.txt", { encoding: "utf-8" })
    console.log("output.txt:", text)
  } catch (error) {
    console.log(`error.stdout: ${error.stdout}`)
    console.log(`error.stderr: ${error.stderr}`)
    process.exit(1)
  }
}

function p2() {
  exec("ls")
    .catch((error) => {
      console.log(`error.stdout: ${error.stdout}`)
      console.log(`error.stderr: ${error.stderr}`)
      process.exit(1)
    })
    .then((the) => {
      fs.promises.writeFile("output.txt", the.stdout)
    })
    .then(() => {
      fs.promises.readFile("output.txt", { encoding: "utf-8" }).then((text) => {
        console.log("output.txt:", text)
      })
    })
}

function p3() {
  const ls = spawn("rm", ["output.*"])

  ls.stdout.on("data", (data) => {
    console.log(`stdout: ${data}`)
  })

  ls.stderr.on("data", (data) => {
    console.error(`stderr: ${data}`)
  })

  ls.on("close", (code) => {
    console.log(`child process exited with code ${code}`)
  })
}

function p4() {
  const ps = spawn("ps", ["ax"])
  const grep = spawn("grep", ["ssh"])

  ps.stdout.on("data", (data) => {
    grep.stdin.write(data)
  })

  ps.stderr.on("data", (data) => {
    console.error(`ps stderr: ${data}`)
  })

  ps.on("close", (code) => {
    if (code !== 0) {
      console.log(`ps process exited with code ${code}`)
    }
    grep.stdin.end()
  })

  grep.stdout.on("data", (data) => {
    console.log(data.toString())
  })

  grep.stderr.on("data", (data) => {
    console.error(`grep stderr: ${data}`)
  })

  grep.on("close", (code) => {
    if (code !== 0) {
      console.log(`grep process exited with code ${code}`)
    }
  })
}

// p1()
// p2()
// p3()
p4()
