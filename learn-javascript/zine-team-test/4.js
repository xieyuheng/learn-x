// 4、假设我们要通过某个第三⽅服务传递字符串数据，但是这个第三⽅通道会把字码在0-255以外
// 的字符转义，并且我们⽆法完全清楚这些转义规则的细节。请想⼀个办法让这个传递过程得以稳
// 定顺畅地进⾏。（假定字符集仅为Unicode字符集）

// 假设不知道下面这个函数的具体转义规则
function escapeCode(code) {
  return "Unknown"
}

// 可以通过它在 0-255 的值
function createEscapeCodeMap() {
  const map = new Map()
  for (let n = 0; n <= 255; n++) {
    const str = escapeCode(n)
    map.set(str, n)
  }

  return map
}

// 建立它在这个定义域的逆映射
function inverseEscapeCode(str) {
  const map = createEscapeCodeMap()
  const code = map.get(str)
  if (code === undefined) {
    throw new Error(`I met unknown escaped string: ${str}`)
  }

  return code
}

// 最后利用这个逆映射来恢复完整的 escaped string。
