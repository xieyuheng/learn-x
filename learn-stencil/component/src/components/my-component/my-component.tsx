import { Component, Prop, h } from "@stencil/core"

@Component({
  tag: "my-component",
  styleUrl: "my-component.css",
  shadow: true,
})
export class MyComponent {
  @Prop() first: string
  @Prop() middle: string
  @Prop() last: string

  render() {
    return (
      <div class="flex">
        <h1 class="p-1 text-rose-300">Hi</h1>
        <div class="p-1 text-rose-400">{this.first}</div>
        <div class="p-1 text-rose-500">{this.middle}</div>
        <div class="p-1 text-rose-500">{this.last}</div>
      </div>
    )
  }
}
