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

class Wheel {
  // TODO
  constructor(public rim: number, public tire: number) {}

  get diameter(): number {
    return this.rim + this.tire * 2
  }

  get circumference(): number {
    return this.diameter * Math.PI
  }
}

console.log(
  new Gear({ chainring: 52, cog: 11, wheel: new Wheel(26, 1.5) }).gear_inches
)
console.log(
  new Gear({ chainring: 52, cog: 11, wheel: new Wheel(24, 1.25) }).gear_inches
)

console.log(new Wheel(26, 1.5).circumference)
console.log(new Wheel(24, 1.25).circumference)
