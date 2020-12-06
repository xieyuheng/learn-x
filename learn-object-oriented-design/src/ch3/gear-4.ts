export class Gear {
  chainring: number
  cog: number
  wheel: { diameter: number }

  constructor(the: {
    chainring: number
    cog: number
    wheel: { diameter: number }
  }) {
    this.chainring = the.chainring
    this.cog = the.cog
    this.wheel = the.wheel
  }

  get ratio(): number {
    return this.chainring / this.cog
  }

  get gear_inches(): number {
    return this.ratio * this.wheel.diameter
  }
}

export class Wheel {
  rim: number
  tire: number

  constructor(the: { rim: number; tire: number }) {
    this.rim = the.rim
    this.tire = the.tire
  }

  get diameter(): number {
    return this.rim + this.tire * 2
  }

  get circumference(): number {
    return this.diameter * Math.PI
  }
}
