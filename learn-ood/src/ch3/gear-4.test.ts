import { Gear, Wheel } from "./gear-4"

console.log(
  new Gear({
    chainring: 52,
    cog: 11,
    wheel: new Wheel({
      rim: 26,
      tire: 1.5,
    }),
  }).gear_inches
)

console.log(
  new Gear({
    chainring: 52,
    cog: 11,
    wheel: new Wheel({
      rim: 24,
      tire: 1.25,
    }),
  }).gear_inches
)

console.log(
  new Wheel({
    rim: 26,
    tire: 1.5,
  }).circumference
)

console.log(
  new Wheel({
    rim: 24,
    tire: 1.25,
  }).circumference
)
