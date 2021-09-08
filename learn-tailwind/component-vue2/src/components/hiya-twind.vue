<script lang="tsx">
import { VNode, CreateElement } from "vue"
import { Component, Prop, Vue } from "vue-property-decorator"
import { tw } from "@/styles/twind"

@Component({
  name: "hiya-twind",
})
export default class extends Vue {
  render(h: CreateElement): VNode {
    return (
      <div class={tw`flex justify-center max-w-xl bg-orange-300`}>
        <div class={tw`py-10 font-bold text-gray-700`}>hiya-twind</div>
      </div>
    )
  }
}
</script>
