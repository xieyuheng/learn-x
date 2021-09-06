<template>
  <hi-twind />
</template>

<script lang="ts">
  import { Component, Vue } from "vue-property-decorator"
  import { HiTwind } from "@xieyuheng/twind-component-example"

  @Component({
    components: {
      HiTwind,
    },
  })
  export default class extends Vue {}
</script>
