export class Gear {
  constructor(
    public chainring: number,
    public cog: number,
    public wheel: { diameter: number }
  ) {}

  get ratio(): number {
    return this.chainring / this.cog
  }

  get gear_inches(): number {
    return this.ratio * this.wheel.diameter
  }
}

class Wheel {
  constructor(public rim: number, public tire: number) {}

  get diameter(): number {
    return this.rim + this.tire * 2
  }

  get circumference(): number {
    return this.diameter * Math.PI
  }
}

console.log(new Gear(52, 11, new Wheel(26, 1.5)).gear_inches)
console.log(new Gear(52, 11, new Wheel(24, 1.25)).gear_inches)

console.log(new Wheel(26, 1.5).circumference)
console.log(new Wheel(24, 1.25).circumference)
