export function downTo(max: number, min: number): Array<number> {
  const numbers = []
  for (let n = max; n >= min; n--) {
    numbers.push(n)
  }
  return numbers
}
