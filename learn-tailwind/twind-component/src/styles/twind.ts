import { create, cssomSheet } from "twind"
import * as colors from "twind/colors"

export const { tw } = create({
  theme: {
    extend: {
      colors,
    },
  },
})
