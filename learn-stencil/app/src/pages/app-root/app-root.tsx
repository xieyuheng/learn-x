import { Component, h } from "@stencil/core"

@Component({
  tag: "app-root",
  styleUrl: "app-root.css",
  shadow: true,
})
export class AppRoot {
  render() {
    return (
      <div>
        <my-component first="Yuheng" last="Xie"></my-component>
        <discord-messages>
          <discord-message>
            Hey guys, I'm new here! Glad to be able to join you all!
          </discord-message>
          <discord-message author="Dawn" avatar="red">
            Hi, I'm new here too!
          </discord-message>
        </discord-messages>
        <stencil-router>
          <stencil-route-switch scrollTopOffset={0}>
            <stencil-route url="/" component="app-home" exact={true} />
            <stencil-route url="/profile/:name" component="app-profile" />
          </stencil-route-switch>
        </stencil-router>
      </div>
    )
  }
}
