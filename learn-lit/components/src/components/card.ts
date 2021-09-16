import { LitElement, html } from "lit"
import { create, cssomSheet } from "twind"
import * as colors from "twind/colors"
import { customElement } from "lit/decorators.js"

const sheet = cssomSheet({ target: new CSSStyleSheet() })
const { tw } = create({ sheet, theme: { extend: { colors } } })

@customElement("sisuo-card")
class SisuoCard extends LitElement {
  static styles = [sheet.target]

  render() {
    return html`
      <main class="${tw`p-2`}">
        <h1 class="${tw`font-bold text-orange-600`}">Sisuo Card!</h1>
      </main>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "sisuo-card": SisuoCard
  }
}
