import { Gear, Wheel } from "./gear-3"

console.log(new Gear(52, 11, new Wheel(26, 1.5)).gear_inches)
console.log(new Gear(52, 11, new Wheel(24, 1.25)).gear_inches)

console.log(new Wheel(26, 1.5).circumference)
console.log(new Wheel(24, 1.25).circumference)
