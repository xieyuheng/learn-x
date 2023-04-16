<script setup lang="ts">
import StarterKit from '@tiptap/starter-kit'
import { EditorContent, useEditor } from '@tiptap/vue-3'
import { onMounted, reactive } from 'vue'
import { getDatabase } from './getDatabase'

const editor = useEditor({
  content: '',
  extensions: [StarterKit],
  editorProps: {
    attributes: {
      class: 'prose my-6 mx-auto focus:outline-none',
    },
  },
})

const state = reactive<{
  database?: IDBDatabase
  notes: Array<{ content: string; createdAt: number }>
}>({
  notes: [],
})

onMounted(async () => {
  state.database = await getDatabase()
  state.notes = await getNotes()
  state.notes.reverse()
})

async function getNotes(): Promise<
  Array<{ content: string; createdAt: number }>
> {
  return new Promise((resolve, reject) => {
    if (state.database === undefined) {
      reject(new Error('no state.database'))
      return
    }

    const notes = state.database
      .transaction('notes')
      .objectStore('notes')
      .getAll()

    notes.onsuccess = (event) => {
      resolve((event.target as any).result)
    }
  })
}

async function saveNote(): Promise<void> {
  return new Promise((resolve, reject) => {
    if (state.database === undefined) {
      reject(new Error('no state.database'))
      return
    }

    const transaction = state.database.transaction('notes', 'readwrite')

    transaction.oncomplete = (event) => {
      resolve(undefined)
    }

    const note = {
      content: editor.value?.getHTML(),
      createdAt: Date.now(),
    }

    state.notes.unshift(note)
    transaction.objectStore('notes').add(note)
  })
}
</script>

<template>
  <div class="flex h-screen w-screen">
    <div
      class="flex w-64 shrink-0 flex-col border-r border-stone-300 bg-stone-100"
    >
      <div class="mt-3 flex flex-col overflow-auto">
        <a
          v-for="note in state.notes"
          class="px-3 py-1"
          :key="note.createdAt"
          href="#"
        >
          <span>{{ new Date(note.createdAt).toLocaleString() }}</span>
        </a>
      </div>
    </div>

    <div class="flex grow flex-col">
      <div class="flex grow flex-col overflow-auto">
        <EditorContent :editor="editor" />
      </div>

      <div class="flex justify-end border-t border-stone-300 bg-stone-100 p-3">
        <button
          class="border border-stone-500 p-2 text-xl hover:text-stone-500"
          @click="saveNote()"
        >
          Save Note
        </button>
      </div>
    </div>
  </div>
</template>
