import { RoadBike, MountainBike, RecumbentBike } from "./bicycle"

const bikes = [
  new RoadBike({ size: "S", tape_color: "red" }),
  new MountainBike({ size: "M", front_shock: "Manitou", rear_shock: "Fox" }),
  new RecumbentBike({ size: "L", flag: "tall and orange" }),
]

for (const bike of bikes) {
  console.log({ ...bike, spares: bike.spares })
}
