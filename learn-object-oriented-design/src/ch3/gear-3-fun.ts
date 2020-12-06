export type Gear = {
  chainring: number
  cog: number
  wheel: { diameter: number }
  ratio: number
  gear_inches: number
}

export function Gear(
  chainring: number,
  cog: number,
  wheel: { diameter: number }
): Gear {
  const ratio = chainring / cog
  const gear_inches = ratio * wheel.diameter

  return {
    chainring,
    cog,
    wheel,
    ratio,
    gear_inches,
  }
}

export type Wheel = {
  rim: number
  tire: number
  diameter: number
  circumference: number
}

export function Wheel(rim: number, tire: number): Wheel {
  const diameter = rim + tire * 2
  const circumference = diameter * Math.PI

  return {
    rim,
    tire,
    diameter,
    circumference,
  }
}
