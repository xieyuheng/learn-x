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
}

console.log(new Gear(52, 11, 26, 1.5).ratio)
console.log(new Gear(52, 11, 24, 1.25).ratio)
