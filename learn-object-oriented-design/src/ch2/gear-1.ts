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
