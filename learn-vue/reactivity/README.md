# Reactivity

Vue 文档中用 Excel spreadsheet 来解释 reactivity 的例子：

- https://vuejs.org/guide/extras/reactivity-in-depth

```js
let A0 = 1
let A1 = 2
let A2 = A0 + A1
```

如果用 propagator 来实现：

```js
let A0 = cell(1)
let A1 = cell(2)
let A2 = adder(A0, A1)

let [A0, A1, A2] = adder()
A0.value = 1
A1.value = 2
```
