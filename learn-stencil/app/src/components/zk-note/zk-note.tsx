import { Component, Prop, h } from "@stencil/core"
// import { ZkNoteState } from "./zk-note-state"

@Component({
  tag: "zk-note",
  styleUrl: "zk-note.css",
  shadow: true,
})
export class ZkNote {
  @Prop() t: string

  // state = new ZkNoteState(this.t)

  render() {
    return (
      <div>
        <h1 class="font-bold text-2xl text-sky-600">{this.t}</h1>
      </div>
    )
  }
}
