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
