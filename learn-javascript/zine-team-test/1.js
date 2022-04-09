// 1、写⼀个函数，输⼊⼀个数组，返回⼀个新数组，新数组的内容与旧数组相同，但顺序随机排序。

function shuffle(array) {
  array = [...array]

  const results = []
  while (array.length > 0) {
    const index = randomIndex(array)
    results.push(array[index])
    removeIndex(array, index)
  }

  return results
}

function randomIndex(array) {
  return Math.floor(Math.random() * array.length)
}

function removeIndex(array, index) {
  return array.splice(index, 1)
}

console.log(shuffle([1, 2, 3]))
console.log(shuffle([1, 2, 3, 1, 2, 3, 1, 2, 3]))
