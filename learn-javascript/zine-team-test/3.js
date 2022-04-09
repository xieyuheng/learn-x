// 3、写⼀个函数，第i次调⽤时返回整数i。

function createCounter() {
  let i = 0
  return () => ++i
}

const count = createCounter()

console.log(count())
console.log(count())
console.log(count())
