clause Child("anne", "bridget")
clause Child("bridget", "caroline")
clause Child("caroline", "donna")
clause Child("donna", "emily")

clause Descend(x, y) -- { Child(x, y) }
clause Descend(x, y) -- { Descend(z, y) Child(x, z) }
// clause Descend(x, y) -- { Child(x, z) Descend(z, y) }

print find [x, y] {
  Descend(x, y)
}
