export default {
  template: `
<button
  class="bg-gray-100 hover:bg-gray-200 border-2 border-gray-400 p-2 disabled:cursor-not-allowed"
  :disabled="disabled"
>
  <slot />
</button>
`,

  props: {
    disabled: Boolean,
  },
}
