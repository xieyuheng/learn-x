<template>
  <div class="max-w-xl m-auto">
    <div class="text-rose-700 py-10 font-bold">hi-windi</div>
  </div>
</template>

<script lang="ts">
import { VNode, CreateElement } from "vue"
import { Component, Prop, Vue } from "vue-property-decorator"

@Component({
  name: "hi-windi",
})
export default class extends Vue {}
</script>
