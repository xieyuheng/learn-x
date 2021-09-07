import { Component, Prop, h } from "@stencil/core"
// import { ZkNoteState } from "./zk-note-state"

@Component({ tag: "zk-note" })
export class ZkNote {
  @Prop() t: string

  // state = new ZkNoteState(this.t)

  render() {
    return (
      <div>
        <h1>{this.t}</h1>
      </div>
    )
  }
}
