import { Config } from "@stencil/core"
import tailwindcss from "tailwindcss"
import { postcss } from "@stencil/postcss"
import tailwind from "proto-stencil-tailwind"

// https://stenciljs.com/docs/config

export const config: Config = {
  globalStyle: "src/global/app.css",
  globalScript: "src/global/app.ts",
  taskQueue: "async",
  plugins: [
    postcss({
      plugins: [require("postcss-import"), tailwindcss()],
    }),
    tailwind({
      tailwind: tailwindcss("tailwind.config.js"),
      inputFile: "./src/styles/app.css",
      includeTailwindCss: false,
    }),
  ],
  // devServer: { reloadStrategy: "pageReload" },
  outputTargets: [
    {
      type: "www",
      // comment the following line to disable service workers in production
      serviceWorker: null,
      baseUrl: "https://myapp.local/",
    },
  ],
}
