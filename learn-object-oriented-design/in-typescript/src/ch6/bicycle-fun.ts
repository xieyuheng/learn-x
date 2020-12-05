export type BicycleEssential = {
  size: string
  chain?: string
  tire_size?: string
}

export type BicycleAbstract = {
  default_chain?: string
  default_tire_size: string
  local_spares?: { [key: string]: string }
}

export type Bicycle = {
  size: string
  chain: string
  tire_size: string
  default_chain: string
  default_tire_size: string
  local_spares: { [key: string]: string }
  spares: { [key: string]: string }
}

export function Bicycle(the: BicycleAbstract & BicycleEssential): Bicycle {
  const default_chain = the.default_chain || "11-speed"
  const default_tire_size = the.default_tire_size
  const local_spares = the.local_spares || {}

  const size = the.size
  const chain = the.chain || default_chain
  const tire_size = the.tire_size || default_tire_size

  return {
    size,
    chain,
    tire_size,

    default_chain,
    default_tire_size,
    local_spares,

    spares: { tire_size, chain, ...local_spares },
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
  const tape_color = the.tape_color

  const bicycle = Bicycle({
    ...the,
    default_tire_size: "23",
    local_spares: { tape_color },
  })

  return {
    ...bicycle,
    tape_color,
  }
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
  const front_shock = the.front_shock
  const rear_shock = the.rear_shock

  const bicycle = Bicycle({
    ...the,
    default_tire_size: "2.1",
    local_spares: { front_shock },
  })

  return {
    ...bicycle,
    front_shock,
    rear_shock,
  }
}

export type RecumbentBike = Bicycle & {
  flag: string
}

export function RecumbentBike(
  the: BicycleEssential & {
    flag: string
  }
): RecumbentBike {
  const flag = the.flag

  const bicycle = Bicycle({
    ...the,
    default_chain: "10-speed",
    default_tire_size: "28",
    local_spares: { flag },
  })

  return {
    ...bicycle,
    flag,
  }
}

const bikes = [
  RoadBike({ size: "S", tape_color: "red" }),
  MountainBike({ size: "M", front_shock: "Manitou", rear_shock: "Fox" }),
  RecumbentBike({ size: "L", flag: "tall and orange" }),
]

for (const bike of bikes) {
  console.log(bike)
}
