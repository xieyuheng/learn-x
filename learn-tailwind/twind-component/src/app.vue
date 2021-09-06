<template>
  <div>
    <hi-twind />
    <hiya-twind />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator"

@Component({
  components: {
    "hi-twind": require("./components/hi-twind.vue").default,
    "hiya-twind": require("./components/hiya-twind.vue").default,
  },
})
export default class extends Vue {}
</script>
