export type Bicycle = {
  size: string
  chain: string
  tire_size: string
  default_chain: string
  default_tire_size: string
}

export type BicycleEssential = {
  size: string
  chain?: string
  tire_size?: string
}

export type BicycleAbstract = {
  default_chain?: string
  default_tire_size: string
}

export function Bicycle(the: BicycleAbstract & BicycleEssential): Bicycle {
  const default_chain = the.default_chain || "11-speed"
  const default_tire_size = the.default_tire_size

  const size = the.size
  const chain = the.chain || default_chain
  const tire_size = the.tire_size || default_tire_size

  return {
    size,
    chain,
    tire_size,
    default_chain,
    default_tire_size,
  }
}

export type RoadBike = Bicycle & {
  tape_color: string
}

export function RoadBike(
  the: BicycleEssential & {
    tape_color: string
  }
): RoadBike {
  const default_tire_size = "23"
  const bicycle = Bicycle({ ...the, default_tire_size })

  const tape_color = the.tape_color
  return { ...bicycle, tape_color }
}

export type MountainBike = Bicycle & {
  front_shock: string
  rear_shock: string
}

export function MountainBike(
  the: BicycleEssential & {
    front_shock: string
    rear_shock: string
  }
): MountainBike {
  const default_tire_size = "2.1"
  const bicycle = Bicycle({ ...the, default_tire_size })

  const front_shock = the.front_shock
  const rear_shock = the.rear_shock
  return { ...bicycle, front_shock, rear_shock }
}

export type RecumbentBike = Bicycle

export function RecumbentBike(the: BicycleEssential): RecumbentBike {
  const default_chain = "10-speed"
  const default_tire_size = "28"
  const bicycle = Bicycle({ ...the, default_chain, default_tire_size })
  return { ...bicycle }
}

const bikes = [
  RoadBike({ size: "S", tape_color: "red" }),
  MountainBike({ size: "M", front_shock: "Manitou", rear_shock: "Fox" }),
  RecumbentBike({ size: "L" }),
]

for (const bike of bikes) {
  console.log(bike)
}
