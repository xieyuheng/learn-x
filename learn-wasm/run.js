const fs = require("fs")

async function run() {
  const buffer = await fs.promises.readFile("learn-wasm.wasm")
  const mod = await WebAssembly.instantiate(buffer)
  const { double } = mod.instance.exports
  console.log(double(2))
}

run()
