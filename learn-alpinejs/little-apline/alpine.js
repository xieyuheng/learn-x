const Alpine = {
  directives: {
    "x-text": (el, value) => {
      el.innerText = value
    },
    "x-show": (el, value) => {
      el.style.display = value ? "initial" : "none"
    },
  },

  start() {
    this.root = document.querySelector("[x-data]")
    this.rawData = this.getInitialData(this.root)
    this.data = this.observe(this.rawData)
    this.registerListeners()
    this.refreshDom()
  },

  getInitialData() {
    const dataString = this.root.getAttribute("x-data")
    return eval(`(${dataString})`)
  },

  observe(data) {
    return new Proxy(data, {
      set: (target, key, value) => {
        target[key] = value

        this.refreshDom()
      },
    })
  },

  refreshDom() {
    this.walkDom(this.root, (el) => {
      Array.from(el.attributes).forEach((attribute) => {
        if (!Object.keys(this.directives).includes(attribute.name)) return
        const directive = this.directives[attribute.name]
        directive(el, eval(`with (this.data) (${attribute.value})`))
      })
    })
  },

  registerListeners() {
    this.walkDom(this.root, (el) => {
      Array.from(el.attributes).forEach((attribute) => {
        if (!attribute.name.startsWith("@")) return

        const event = attribute.name.slice(1)

        el.addEventListener(event, () => {
          eval(`with (this.data) (${attribute.value})`)
        })
      })
    })
  },

  walkDom(el, callback) {
    callback(el)
    el = el.firstElementChild
    while (el) {
      this.walkDom(el, callback)
      el = el.nextElementSibling
    }
  },
}

Alpine.start()
