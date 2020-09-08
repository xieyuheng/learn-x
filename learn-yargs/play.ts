// NOTE Learning yargs.

export const command = "play"

type Difficulty = "normal" | "nightmare" | "hell"

const difficulties: ReadonlyArray<Difficulty> = ["normal", "nightmare", "hell"]

export const builder = {
  a: { type: "boolean", default: false },
  b: { type: "string", demandOption: true },
  c: { type: "number", alias: "chill" },
  d: { type: "array" },
  e: { type: "count" },
  f: { choices: difficulties },
}

interface Argv {
  a: boolean
  b: string
  c: number | undefined
  d: Array<string | number> | undefined
  e: number
  f: string | undefined
  [key: string]: unknown
  _: Array<string>
  $0: string
}

export const handler = (argv: Argv) => {
  console.log(argv)
}
