<script setup lang="ts">
import StarterKit from '@tiptap/starter-kit'
import { EditorContent, useEditor } from '@tiptap/vue-3'

const editor = useEditor({
  content: '',
  extensions: [StarterKit],
  editorProps: {
    attributes: {
      class: 'prose my-6 mx-auto focus:outline-none',
    },
  },
})
</script>

<template>
  <editor-content :editor="editor" />
</template>
