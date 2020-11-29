export class Gear {
  constructor(
    public chainring: number,
    public cog: number,
  ) {}

  get ratio(): number {
    return this.chainring / this.cog
  }
}

console.log(new Gear(52, 11).ratio)
console.log(new Gear(30, 27).ratio)
