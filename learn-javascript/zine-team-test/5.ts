// 5、请你写⼀段代码完成这个过程：
// 将给定的⼀棵DOM树的指定信息提取成⼀棵JSON树，每个节点的提取信息包括：
// 1)节点类型
// 2)节点名称
// 3)节点全部的属性和值
// 4)节点取值（⽐如⽂本节点）

interface VNode {
  kind: string
  name: string
  attributes: Record<string, string>
  value: string
  children: Array<VNode>
}

function createVNodeFromElement(element): VNode {
  const children = []
  let child = element.firstElementChild
  while (child) {
    children.push(createVNode(child))
    child = child.nextElementSibling
  }

  // 下面的字段比较平凡
  const kind = TODO
  const name = TODO
  const attributes = TODO
  const value = TODO

  return { kind, name, attributes, value, children }
}
