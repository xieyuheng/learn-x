import { Gear, Wheel } from "./gear-3-fun-ky"

console.log(
  Gear({
    chainring: 52,
    cog: 11,
    wheel: Wheel({ rim: 26, tire: 1.5 }),
  }).gear_inches
)
console.log(
  Gear({
    chainring: 52,
    cog: 11,
    wheel: Wheel({ rim: 24, tire: 1.25 }),
  }).gear_inches
)

console.log(Wheel({ rim: 26, tire: 1.5 }).circumference)
console.log(Wheel({ rim: 24, tire: 1.25 }).circumference)

console.log(Gear.create(52, 11, Wheel.create(26, 1.5)).gear_inches)
console.log(Gear.create(52, 11, Wheel.create(24, 1.25)).gear_inches)

console.log(Wheel.create(26, 1.5).circumference)
console.log(Wheel.create(24, 1.25).circumference)
