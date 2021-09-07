import { Component, h } from "@stencil/core"

@Component({
  tag: "app-home",
  styleUrl: "app-home.css",
  shadow: true,
})
export class AppHome {
  render() {
    return (
      <div class="app-home">
        <p class="text-orange-600 font-bold px-4">hiya!</p>

        <my-component first="Yuheng" last="Xie"></my-component>

        <zk-note t="xyh"></zk-note>

        <stencil-route-link url="/profile/stencil">
          <button>Profile page</button>
        </stencil-route-link>
      </div>
    )
  }
}
