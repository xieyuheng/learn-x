export abstract class Bicycle {
  size: string
  chain: string
  tire_size: string

  constructor(the: { size: string; chain?: string; tire_size?: string }) {
    this.size = the.size
    this.chain = the.chain || this.default_chain
    this.tire_size = the.tire_size || this.default_tire_size
  }

  get default_chain(): string {
    return "11-speed"
  }

  get default_tire_size(): string {
    throw new Error("Expecting default_tire_size to be implemented by subclass")
  }
}

export class RoadBike extends Bicycle {
  get default_tire_size(): string {
    return "23"
  }
}

export class MountainBike extends Bicycle {
  get default_tire_size(): string {
    return "2.1"
  }
}

export class RecumbentBike extends Bicycle {
  get default_chain(): string {
    return "10-speed"
  }
}

{
  console.log(new RoadBike({ size: "M" }))
  console.log(new RecumbentBike({ size: "L" }))
}
