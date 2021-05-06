export class Animal {
  name: string

  constructor(name: string) {
    this.name = name
  }

  static find(id: string): undefined | Animal {
    return animalDatabase.get(id)
  }
}

const animalDatabase: Map<string, Animal> = new Map([
  ["pig1", new Animal("Pig")],
  ["sheep2", new Animal("Sheep")],
])

// NOTE Let's try to use it.

{
  const ids = ["pig1", "sheep2"]
  // const animals = ids.map((id) => Animal.find(id))
  // for (const animal of animals) {
  //   console.log(animal.name)
  // }

  // NOTE but we meet Type error.
}

{
  // NOTE So we write condition

  const ids = ["pig1", "sheep2"]
  const animals = ids.map((id) => Animal.find(id))
  for (const animal of animals) {
    console.log(animal ? animal.name : "no animal")

    // NOTE 结果就是我们的代码里到处都是：
    // animal ? animal.name : "no animal"
    // animal ? animal.name : "no animal"
    // animal ? animal.name : "no animal"
  }
}
