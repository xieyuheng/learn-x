export type BicycleEssential = {
  size: string
  chain?: string
  tire_size?: string
}

export abstract class Bicycle {
  size: string
  chain: string
  tire_size: string

  constructor(the: BicycleEssential) {
    this.size = the.size
    this.chain = the.chain || this.default_chain
    this.tire_size = the.tire_size || this.default_tire_size
    this.post_create(the)
  }

  post_create(the: { [key: string]: undefined | string }): void {}

  get spares(): { [key: string]: string } {
    return {
      chain: this.chain,
      tire_size: this.tire_size,
      ...this.local_spares,
    }
  }

  get local_spares(): { [key: string]: string } {
    return {}
  }

  get default_chain(): string {
    return "11-speed"
  }

  get default_tire_size(): string {
    throw new Error("Expecting default_tire_size to be implemented by subclass")
  }
}

export class RoadBike extends Bicycle {
  tape_color: string

  constructor(the: BicycleEssential & { tape_color: string }) {
    super(the)
    this.tape_color = the.tape_color
  }

  get local_spares(): { [key: string]: string } {
    return { tape_color: this.tape_color }
  }

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

  get default_tire_size(): string {
    return "28"
  }
}

{
  console.log(new RoadBike({ size: "S", tape_color: "red" }))
  console.log(new MountainBike({ size: "M" }))
  console.log(new RecumbentBike({ size: "L" }))
}
