import { RoadBike, MountainBike, RecumbentBike } from "./bicycle-fun"

const bikes = [
  RoadBike({ size: "S", tape_color: "red" }),
  MountainBike({ size: "M", front_shock: "Manitou", rear_shock: "Fox" }),
  RecumbentBike({ size: "L", flag: "tall and orange" }),
]

for (const bike of bikes) {
  console.log(bike)
}
