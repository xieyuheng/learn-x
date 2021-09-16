import { LitElement, html } from "lit"
import { customElement } from "lit/decorators.js"
import { create, cssomSheet } from "twind"
import * as colors from "twind/colors"

const sheet = cssomSheet({ target: new CSSStyleSheet() })
const { tw } = create({ sheet, theme: { extend: { colors } } })

@customElement("hello-world")
class HelloWorld extends LitElement {
  static styles = [sheet.target]

  render() {
    return html`
      <main class="${tw`p-2`}">
        <div class="${tw`font-bold text-orange-600`}">
          A web component with runtime tailwind support!
        </div>
        <h1 class="${tw`p-2`}">- Tailwind preflight is enabled.</h1>
      </main>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "hello-world": HelloWorld
  }
}
