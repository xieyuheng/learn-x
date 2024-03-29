import { Config } from "@stencil/core"
import { postcss } from "@stencil/postcss"
import tailwind from "proto-stencil-tailwind"
import tailwindcss from "tailwindcss"

// https://stenciljs.com/docs/config

export const config: Config = {
  globalStyle: "src/global/app.css",
  globalScript: "src/global/app.ts",
  taskQueue: "async",
  plugins: [
    // postcss for preflight
    postcss({
      plugins: [tailwindcss("tailwind.config.js")],
    }),
    tailwind({
      tailwind: tailwindcss("tailwind.config.js"),
      includeTailwindCss: true,
    }),
  ],
  devServer: { reloadStrategy: "pageReload" },
  outputTargets: [
    {
      type: "www",
      serviceWorker: null,
    },
  ],
}
