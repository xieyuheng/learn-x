export type Gear = {
  chainring: number
  cog: number
  wheel: { diameter: number }
  ratio: number
  gear_inches: number
}

export function Gear(the: {
  chainring: number
  cog: number
  wheel: { diameter: number }
}): Gear {
  const chainring = the.chainring
  const cog = the.cog
  const wheel = the.wheel

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

export function Wheel(the: { rim: number; tire: number }): Wheel {
  const rim = the.rim
  const tire = the.tire

  const diameter = rim + tire * 2
  const circumference = diameter * Math.PI

  return {
    rim,
    tire,
    diameter,
    circumference,
  }
}

console.log(
  Gear({
    chainring: 52,
    cog: 11,
    wheel: Wheel({ rim: 26, tire: 1.5 }),
  }).gear_inches
)
console.log(
  Gear({
    chainring: 52,
    cog: 11,
    wheel: Wheel({ rim: 24, tire: 1.25 }),
  }).gear_inches
)

console.log(Wheel({ rim: 26, tire: 1.5 }).circumference)
console.log(Wheel({ rim: 24, tire: 1.25 }).circumference)
