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

import "./gear-3-fun-ky-create"
