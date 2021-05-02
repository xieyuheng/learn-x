import { Gear, Wheel } from "./gear-3-fun"

console.log(Gear(52, 11, Wheel(26, 1.5)).gear_inches)
console.log(Gear(52, 11, Wheel(24, 1.25)).gear_inches)

console.log(Wheel(26, 1.5).circumference)
console.log(Wheel(24, 1.25).circumference)
