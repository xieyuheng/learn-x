import { Setoid, assert_eq } from "./setoid"

export class Semigroup<Element> {
  elements: Setoid<Element>
  mul: (x: Element, y: Element) => Element

  constructor(opts: {
    elements: Setoid<Element>
    mul: (x: Element, y: Element) => Element
  }) {
    this.elements = opts.elements
    this.mul = opts.mul
  }

  mul_associative(x: Element, y: Element, z: Element) {
    assert_eq(
      this.elements,
      this.mul(x, this.mul(y, z)),
      this.mul(this.mul(x, y), z)
    )
  }
}
