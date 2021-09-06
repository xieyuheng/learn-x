<template>
  <hi-twind />
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator"

@Component({
  components: {
    "hi-twind": require("./components/hi-twind.vue").default,
  },
})
export default class extends Vue {}
</script>
