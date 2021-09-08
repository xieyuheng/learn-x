<template>
  <div class="flex justify-center max-w-xl bg-orange-300">
    <div class="py-10 font-bold text-gray-700">hiya-windi</div>
  </div>
</template>

<script lang="ts">
import { VNode, CreateElement } from "vue"
import { Component, Prop, Vue } from "vue-property-decorator"

@Component({
  name: "hiya-windi",
})
export default class extends Vue {}
</script>
