/**
 * @arg: {string} tag
 * @arg: {{ [key: string]: string }} attr
 * @arg: {Array<HTMLElement | Text | string>} children
 * @return: {HTMLElement}
 */
function elm_strict(tag, attr, children) {
  const node = document.createElement(tag)
  for (let k in attr)
    node.setAttribute(k, attr[k])
  node.append(...children)
  return node
}

/**
 * @arg: {Array<any>} ...args
 * @return: {HTMLElement}
 */
function elm(...args) {
  if (args.length === 0)
    throw new Error("args.length === 0\n")
  else if (args.length === 1)
    return elm_strict(args[0], {}, [])
  else if (args.length === 2)
    return (args[1] instanceof Array)
    ? elm_strict(args[0], {}, args[1])
    : elm_strict(args[0], args[1], [])
  else if (args.length === 3)
    return elm_strict(args[0], args[1], args[2])
  else
    throw new Error("args.length > 3\n")
}

class RoadmapUsage extends HTMLElement {
  constructor() {
    super()
    const shadow = this.attachShadow({ mode: "open" })

    shadow.append(elm("p", [ "element-1" ]))
    shadow.append(elm("p", [ "element-2" ]))
    shadow.append(elm("p", [ "element-3" ]))

    const template = elm("template", { "id": "my-paragraph" }, [
      elm("p", [ "My paragraph" ])
    ])

    shadow.append(template.content.cloneNode(true))
  }
}

customElements.define("roadmap-usage", RoadmapUsage)
