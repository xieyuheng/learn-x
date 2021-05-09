export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

export function downTo(max: number, min: number): Array<number> {
  const numbers = []
  for (let n = max; n >= min; n--) {
    numbers.push(n)
  }
  return numbers
}
