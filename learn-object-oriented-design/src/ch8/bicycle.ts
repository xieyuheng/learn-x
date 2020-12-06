export type Bicycle = {
  size: string
  parts: Array<Part>
  spares: Array<Part>
}

export function Bicycle(size: string, parts: Array<Part>): Bicycle {
  return {
    size,
    parts,
    get spares(): Array<Part> {
      return parts.filter((part) => part.needs_spare_p)
    },
  }
}

export type Part = {
  name: string
  description: string
  needs_spare_p: boolean
}

export function Part(
  name: string,
  description: string,
  needs_spare_p: boolean = true
): Part {
  return {
    name,
    description,
    needs_spare_p,
  }
}

export namespace Part {
  export type Config = [string, string, boolean?]

  export function build(config: Config): Part {
    const [name, description, needs_spare_p] = config
    return {
      name,
      description,
      needs_spare_p: needs_spare_p !== undefined ? needs_spare_p : true,
    }
  }
}
