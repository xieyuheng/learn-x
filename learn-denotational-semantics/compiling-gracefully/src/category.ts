import { Setoid, assert_eq } from "./setoid"

export class Category<Object, Morphism> {
  objects: Setoid<Object>
  morphisms: Setoid<Morphism>
  dom: (f: Morphism) => Object
  cod: (f: Morphism) => Object
  id: (x: Object) => Morphism
  compose: (f: Morphism, g: Morphism) => Morphism

  constructor(opts: {
    objects: Setoid<Object>
    morphisms: Setoid<Morphism>
    dom: (f: Morphism) => Object
    cod: (f: Morphism) => Object
    id: (x: Object) => Morphism
    compose: (f: Morphism, g: Morphism) => Morphism
  }) {
    this.objects = opts.objects
    this.morphisms = opts.morphisms
    this.dom = opts.dom
    this.cod = opts.cod
    this.id = opts.id
    this.compose = (f, g) => {
      assert_eq(this.objects, this.cod(f), this.dom(g))
      return opts.compose(f, g)
    }
  }

  id_left(f: Morphism) {
    assert_eq(this.morphisms, this.compose(this.id(this.dom(f)), f), f)
  }

  id_right(f: Morphism) {
    assert_eq(this.morphisms, this.compose(f, this.id(this.cod(f))), f)
  }

  compose_associative(f: Morphism, g: Morphism, h: Morphism) {
    assert_eq(
      this.morphisms,
      this.compose(this.compose(f, g), h),
      this.compose(f, this.compose(g, h))
    )
  }
}
