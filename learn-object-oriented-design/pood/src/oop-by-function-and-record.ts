import ty, { Schema } from "@xieyuheng/ty"

type UserOptions = {
  id: number
  name: string
}

type UserMathods = {
  login(): void
  hi(): void
  json(): UserOptions
}

type User = UserOptions & UserMathods

const userSchema = ty.object({
  id: ty.number(),
  name: ty.string(),
})

function userMathods({ id, name }: UserOptions): UserMathods {
  function hi(): void {
    console.log("hiya!")
  }

  function login(): void {
    console.log(`login -- id: ${id}, name: ${name}`)
    hi()
  }

  function json(): UserOptions {
    return { id, name }
  }

  return {
    login,
    hi,
    json,
  }
}

function userStatics() {
  function create(opts: UserOptions): User {
    return {
      ...opts,
      ...userMathods(opts),
    }
  }

  function build(input: any): User {
    return create(userSchema.validate(input))
  }

  return {
    create,
    build,
  }
}

const User = userStatics()

const user1 = User.create({ id: 1, name: "xyh" })
user1.login()

const user2 = User.build({ id: 2, name: "xyh" })
user2.login()
