export class Gear {
  constructor(
    public chainring: number,
    public cog: number,
    public rim: number,
    public tire: number
  ) {}

  get ratio(): number {
    return this.chainring / this.cog
  }

  get gear_inches(): number {
    return this.ratio * (this.rim + this.tire * 2)
  }
}

// console.log(new Gear(52, 11).ratio)
// console.log(new Gear(30, 27).ratio)

console.log(new Gear(52, 11, 26, 1.5).gear_inches)
console.log(new Gear(52, 11, 24, 1.25).gear_inches)
