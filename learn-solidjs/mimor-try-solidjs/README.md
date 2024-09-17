决定放弃使用 solidjs，因为：

- solidjs 继承了很多 react 中的糟粕，
  比如非标准的 onClick 的行为，
  虽然有 on:click 但是不推荐使用，ts 的支持也不好。

- solidjs 不想支持简单的类似 vue 的 reactive 函数，
  虽然现在有 createMutable，但是准备删除这个 API。

  - https://github.com/solidjs/solid/discussions/2288

  可以说 solidjs 继承了 react 以来的 “用函数式写前端” 的思想，
  这是为了函数式而函数式，而不是真正把函数式用在合适的地方。
