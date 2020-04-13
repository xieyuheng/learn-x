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
  else {
    const tag = tag_class_p(args[0]) ? tag_gen(args[0]) : args[0]
    if (args.length === 1)
      return elm_strict(tag, {}, [])
    else if (args.length === 2)
      return (args[1] instanceof Array)
      ? elm_strict(tag, {}, args[1])
      : elm_strict(tag, args[1], [])
    else if (args.length === 3)
      return elm_strict(tag, args[1], args[2])
    else
      throw new Error("args.length > 3\n")
  }
}

/**
 * @arg: {class} tag_class
 */
function tag_register(tag_class) {
  const tag = tag_name_gen(tag_class)
  const found = window.customElements.get(tag)
  if (found === undefined)
    window.customElements.define(tag, tag_class)
  else {
    if (found !== tag_class)
      throw new Error(
        "re-register tag to different class\n" +
          `tag: ${tag}\n` +
          `class: ${tag_class}\n`)
  }
}

/**
 * @arg: {any} x
 * @return: {boolean}
 */
function tag_class_p(x) {
  return typeof x === "function"
}

/**
 * @arg: {class} tag_class
 * @return: {string}
 */
function tag_name_gen(tag_class) {
  const tag_name = tag_class.name.split("_").join("-")
  return tag_name
}

/**
 * @arg: {class} tag_class
 * @return: {string}
 */
function tag_gen(tag_class) {
  tag_register(tag_class)
  return tag_name_gen(tag_class)
}

// examples

class roadmap_usage_t extends HTMLElement {
  constructor() {
    super()
    const shadow = this.attachShadow({ mode: "open" })
    shadow.append(elm("p", [ "e-1" ]))
    shadow.append(elm("p", [ "e-2" ]))
    shadow.append(elm("p", [ "e-3" ]))
    shadow.append(elm("slot", { "name": "url" }))
    shadow.append(elm("slot", { "name": "x" }))
    shadow.append(elm("slot", { "name": "y" }))
  }
}

tag_register(roadmap_usage_t)
tag_register(roadmap_usage_t)
tag_register(roadmap_usage_t)

class roadmap_main_t extends HTMLElement {
  constructor() {
    super()
    const shadow = this.attachShadow({ mode: "open" })
    shadow.append(elm(roadmap_usage_t, [
      elm("div", { "slot": "url" }, [ "http://example.com" ]),
      elm("div", { "slot": "x" }, [ "xxx" ]),
      elm("div", { "slot": "y" }, [ "yyy" ]),
    ]))
  }
}

tag_register(roadmap_main_t)
