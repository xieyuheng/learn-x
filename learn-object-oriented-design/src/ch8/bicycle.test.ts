import { Bicycle, Part } from "./bicycle"

const road_parts: Array<Part.Config> = [
  ["chain", "11-speed"],
  ["tire_size", "23"],
  ["tape_color", "red"],
]

const mountain_parts: Array<Part.Config> = [
  ["chain", "11-speed"],
  ["tire_size", "2.1"],
  ["front_shock", "Manitou"],
  ["rear_shock", "Fox", false],
]

const recumbent_config: Array<Part.Config>  = [
  ["chain", "9-speed"],
  ["tire_size", "28"],
  ["flag", "tall and orange"],
]

const bikes = [
  Bicycle("L", road_parts.map(Part.build)),
  Bicycle("S", mountain_parts.map(Part.build)),
  Bicycle("M", recumbent_config.map(Part.build)),
]

for (const bike of bikes) {
  console.log(bike.spares)
}
