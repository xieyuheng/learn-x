<template>
  <div>
    <div>
      <h1>Normal import:</h1>
      <hi-windi />
      <hiya-windi />
    </div>

    <div>
      <h1>Web Component:</h1>
      <twc-hi-windi />
      <twc-hiya-windi />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator"
import twComponents from "@xieyuheng/tailwind-components-vue2"
import "@xieyuheng/tailwind-components-vue2/wc/twc"

@Component({
  components: {
    ...twComponents,
  },
})
export default class extends Vue {}
</script>
