<script lang="tsx">
import { VNode, CreateElement } from "vue"
import { Component, Prop, Vue } from "vue-property-decorator"
import { tw } from "@/styles/twind"

@Component({
  name: "hi-twind",
})
export default class extends Vue {
  render(h: CreateElement): VNode {
    return (
      <div class={tw`max-w-xl m-auto`}>
      <div class={tw`text-rose-700 py-10 font-bold`}>hi</div>
      </div>
    )
  }
}
</script>
