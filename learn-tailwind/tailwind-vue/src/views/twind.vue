<template>
  <div>
    <hi-twind />
    <hiya-twind />
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from "vue-property-decorator"
  import twindComponents from "@xieyuheng/twind-component-example"

  @Component({
    components: {
      ...twindComponents,
    },
  })
  export default class extends Vue {}
</script>
