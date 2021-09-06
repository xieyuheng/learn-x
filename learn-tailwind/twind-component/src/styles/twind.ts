import { create, cssomSheet } from "twind"
import * as colors from "twind/colors"

const sheet = cssomSheet({ target: new CSSStyleSheet() })

export const { tw } = create({
  sheet,
  theme: {
    extend: {
      colors,
    },
  },
})
