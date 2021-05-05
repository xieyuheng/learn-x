type Watt = number
type Currency = number

export abstract class Equipment {
  abstract name: string
  abstract power: Watt
  abstract netPrice: Currency
  abstract discountPrice: Currency
  abstract add(equipment: Equipment): void
  abstract remove(equipment: Equipment): void
  abstract parts: Array<Equipment>
}

export abstract class PrimitiveEquipment {
  abstract name: string
  abstract power: Watt
  abstract netPrice: Currency
  abstract discountPrice: Currency

  add(equipment: Equipment): void {
    throw new Error("Can not add to primitive equipment")
  }

  remove(equipment: Equipment): void {
    throw new Error("Can not remove from primitive equipment")
  }

  get parts(): Array<Equipment> {
    return []
  }
}

export abstract class CompositeEquipment extends Equipment {
  abstract name: string
  abstract parts: Array<Equipment>

  get power(): Watt {
    let result = 0
    for (const part of this.parts) {
      result += part.power
    }

    return result
  }

  get netPrice(): Currency {
    let result = 0
    for (const part of this.parts) {
      result += part.netPrice
    }

    return result
  }

  get discountPrice(): Currency {
    let result = 0
    for (const part of this.parts) {
      result += part.discountPrice
    }

    return result
  }

  add(equipment: Equipment): void {
    this.parts.push(equipment)
  }

  remove(equipment: Equipment): void {
    const index = this.parts.indexOf(equipment)
    if (index !== -1) {
      this.parts.splice(index, 1)
    }
  }
}

export class FloppyDisk extends PrimitiveEquipment {
  name: string
  power: Watt
  netPrice: Currency
  discountPrice: Currency

  constructor(opts: {
    name: string
    power: Watt
    netPrice: Currency
    discountPrice: Currency
  }) {
    super()
    this.name = opts.name
    this.power = opts.power
    this.netPrice = opts.netPrice
    this.discountPrice = opts.discountPrice
  }
}
