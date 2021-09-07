import { Config } from "@stencil/core"
import { postcss } from "@stencil/postcss"
import tailwind from "proto-stencil-tailwind"
import tailwindcss from "tailwindcss"

export const config: Config = {
  namespace: "component",
  plugins: [
    // use postcss to importing tailwindcss preflight module
    postcss({
      plugins: [require("postcss-import"), tailwindcss("tailwind.config.js")],
    }),
    tailwind({
      tailwind: tailwindcss("tailwind.config.js"),
    }),
  ],
  devServer: { reloadStrategy: "pageReload" },
  outputTargets: [
    { type: "dist", esmLoaderPath: "../loader" },
    { type: "dist-custom-elements-bundle" },
    { type: "www", serviceWorker: null },
  ],
}
