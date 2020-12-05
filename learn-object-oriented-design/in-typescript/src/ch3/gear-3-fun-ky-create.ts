import { Gear, Wheel } from "./gear-3-fun-ky"

declare module "./gear-3-fun-ky" {
  namespace Gear {
    function create(
      chainring: number,
      cog: number,
      wheel: { diameter: number }
    ): Gear
  }

   namespace Wheel {
     function create(rim: number, tire: number): Wheel
  }
}

Gear.create = function (
  chainring: number,
  cog: number,
  wheel: { diameter: number }
): Gear {
  return Gear({ chainring, cog, wheel })
}

Wheel.create = function (rim: number, tire: number): Wheel {
  return Wheel({ rim, tire })
}

console.log(Gear.create(52, 11, Wheel.create(26, 1.5)).gear_inches)
console.log(Gear.create(52, 11, Wheel.create(24, 1.25)).gear_inches)

console.log(Wheel.create(26, 1.5).circumference)
console.log(Wheel.create(24, 1.25).circumference)
