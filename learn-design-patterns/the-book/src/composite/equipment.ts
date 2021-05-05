type Watt = number
type Currency = number

export abstract class Equipment {
  abstract name: string

  abstract power: Watt
  abstract netPrice: Currency
  abstract discountPrice: Currency

  abstract add(equipment: Equipment): void
  abstract remove(equipment: Equipment): void
}
