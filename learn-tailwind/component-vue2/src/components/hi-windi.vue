<template>
  <div class="max-w-xl m-auto">
    <div class="text-rose-700 py-10 font-bold">hi-windi</div>
  </div>
</template>

<script lang="ts">
import { VNode, CreateElement } from "vue"
import { Component, Prop, Vue } from "vue-property-decorator"
const { generateStyles } = require("@/plugins/windi")

@Component({
  name: "hi-windi",
})
export default class extends Vue {
  mounted(): void {
    const styles = generateStyles(`
      <div class="max-w-xl m-auto">
      <div class="text-rose-700 py-10 font-bold">hi-twind</div>
      </div>
    `)
    console.log(styles)
  }
}
</script>
