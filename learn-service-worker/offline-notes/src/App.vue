<script setup lang="ts">
import Tiptap from './components/Tiptap.vue'
</script>

<template>
  <div class="flex h-screen w-screen">
    <div class="flex w-64 shrink-0 flex-col border-r border-black">TODO</div>
    <div class="flex grow flex-col">
      <div class="flex grow flex-col overflow-auto">
        <Tiptap />
      </div>
    </div>
  </div>
</template>
