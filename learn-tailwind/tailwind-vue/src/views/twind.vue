<template>
  <div>
    <div>
      <h1>Normal import:</h1>
      <hi-twind />
      <hiya-twind />
    </div>

    <div>
      <h1>Web Component:</h1>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator"
import twindComponents from "@xieyuheng/twind-component-example"
import twc from "@xieyuheng/twind-component-example/wc/twc"

@Component({
  components: {
    ...twindComponents,
  },
})
export default class extends Vue {
  mounted(): void {
    console.log(twc)
  }
}
</script>
