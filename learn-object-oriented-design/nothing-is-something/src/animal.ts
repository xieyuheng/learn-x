class Animal {
  name: string

  constructor(name: string) {
    this.name = name
  }

  static find(id: string): undefined | Animal {
    return animalDatabase.get(id)
  }
}

const animalDatabase: Map<string, Animal> = new Map([
  ["pig76", new Animal("pig")],
  ["sheep24", new Animal("sheep")],
])

const ids = ["pig76", "", "sheep24"]

// NOTE Let's try to use it.

{
  // const animals = ids.map((id) => Animal.find(id))
  // for (const animal of animals) {
  //   console.log(animal.name)
  // }
  // NOTE but we meet Type error.
}

{
  // NOTE So we write condition

  const animals = ids.map((id) => Animal.find(id))
  for (const animal of animals) {
    console.log(animal ? animal.name : "no animal")
  }

  // NOTE 结果就是我们的代码里到处都是：
  // animal ? animal.name : "no animal"
  // animal ? animal.name : "no animal"
  // animal ? animal.name : "no animal"
}

{
  // NOTE 这里的问题就是 Animal.find 所返回的东西，
  //   有时是 Animal 它知道 name 这个 message，
  //   但是有时是 undefined 它就不能理解 name 这个 message。

  class MissingAnimal {
    name = "no animal"
  }

  const animals = ids.map((id) => Animal.find(id) || new MissingAnimal())
  for (const animal of animals) {
    console.log(animal.name)
  }

  // NOTE 但是这里的结果是是我们的代码里到处都是：
  // Animal.find(id) || new MissingAnimal()
  // Animal.find(id) || new MissingAnimal()
  // Animal.find(id) || new MissingAnimal()

  // NOTE 但是这里已经有些许改善了，
  //   与其重复 "no animal" 这个行为 behavior，
  //   我们只知道 MissingAnimal 这个 class name 就可以了。

  // NOTE 上面这种技巧叫做 Null object pattern，
  //   据说一个叫 Bruce Anderson 的人管它叫 "Active Nothing"，
  //   有种禅宗的味道了。
}

{
  // NOTE 这里的问题就是，我们还是要重复 MissingAnimal。

  class Animal {
    name: string

    constructor(name: string) {
      this.name = name
    }

    static find(id: string): Animal {
      return animalDatabase.get(id) || new MissingAnimal()
    }
  }

  class MissingAnimal extends Animal {
    constructor() {
      super("no animal")
    }
  }

  const animals = ids.map((id) => Animal.find(id))
  for (const animal of animals) {
    console.log(animal.name)
  }
}
