// 2、写⼀个函数，输⼊⼀个字符串s以及⼀个整数n，返回⼀个新字符串，内容为s从左边开始，
// ⻓度不超过n的⼦串，其中英⽂字符及数字⻓度算1，汉字⻓度算2。

function leftStr(str, length, result = "") {
  if (length <= 0 || str.length === 0) return result
  return leftStr(str.slice(1), length - charSize(str[0]), result + str[0])
}

function charSize(char) {
  return isHanChar(char) ? 2 : 1
}

function isHanChar(char) {
  return char.match(/\p{Script=Han}/u)
}

console.log(leftStr("abcd1234", 3)) //  ->  abc
console.log(leftStr("Zine是⼀个写作平台", 8)) //  ->  Zine是⼀
