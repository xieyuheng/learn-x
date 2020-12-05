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
  }

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
  front_shock: string
  rear_shock: string

  constructor(
    the: BicycleEssential & { front_shock: string; rear_shock: string }
  ) {
    super(the)
    this.front_shock = the.front_shock
    this.rear_shock = the.rear_shock
  }

  get local_spares(): { [key: string]: string } {
    return { front_shock: this.front_shock }
  }

  get default_tire_size(): string {
    return "2.1"
  }
}

export class RecumbentBike extends Bicycle {
  flag: string

  constructor(the: BicycleEssential & { flag: string }) {
    super(the)
    this.flag = the.flag
  }

  get local_spares(): { [key: string]: string } {
    return { flag: this.flag }
  }

  get default_chain(): string {
    return "10-speed"
  }

  get default_tire_size(): string {
    return "28"
  }
}

const bikes = [
  new RoadBike({ size: "S", tape_color: "red" }),
  new MountainBike({ size: "M", front_shock: "Manitou", rear_shock: "Fox" }),
  new RecumbentBike({ size: "L", flag: "tall and orange" }),
]

for (const bike of bikes) {
  console.log({ ...bike, spares: bike.spares })
}
