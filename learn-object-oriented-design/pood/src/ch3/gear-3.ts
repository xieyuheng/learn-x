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

export class Wheel {
  constructor(public rim: number, public tire: number) {}

  get diameter(): number {
    return this.rim + this.tire * 2
  }

  get circumference(): number {
    return this.diameter * Math.PI
  }
}
