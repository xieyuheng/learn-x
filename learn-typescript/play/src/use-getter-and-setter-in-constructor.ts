class C {
  _token?: string

  constructor(token: string) {
    this.token = token
  }

  get token(): string | undefined {
    return this._token
  }

  set token(x: string | undefined) {
    this._token = x

    console.log(x)
  }
}

console.log(new C("123"))
