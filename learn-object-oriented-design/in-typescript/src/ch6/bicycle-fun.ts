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

export type MountainBike = Bicycle

export function MountainBike(the: BicycleEssential): MountainBike {
  const default_tire_size = "2.1"
  const bicycle = Bicycle({ ...the, default_tire_size })
  return { ...bicycle }
}

export type RecumbentBike = Bicycle

export function RecumbentBike(the: BicycleEssential): RecumbentBike {
  const default_chain = "10-speed"
  const default_tire_size = "28"
  const bicycle = Bicycle({ ...the, default_chain, default_tire_size })
  return { ...bicycle }
}

{
  console.log(RoadBike({ size: "S", tape_color: "red" }))
  console.log(MountainBike({ size: "M" }))
  console.log(RecumbentBike({ size: "L" }))
}
