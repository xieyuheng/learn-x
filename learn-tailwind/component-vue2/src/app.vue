<template>
  <div>
    <!-- <hi-twind />
         <hiya-twind /> -->
    <hi-windi />
    <hiya-windi />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator"

@Component({
  components: {
    // "hi-twind": require("./components/hi-twind.vue").default,
  // "hiya-twind": require("./components/hiya-twind.vue").default,
    "hi-windi": require("./components/hi-windi.vue").default,
    "hiya-windi": require("./components/hiya-windi.vue").default,
  },
})
export default class extends Vue {}
</script>
