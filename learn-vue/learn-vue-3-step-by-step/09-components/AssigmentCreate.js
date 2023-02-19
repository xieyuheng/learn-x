export default {
  template: `
    <form class="my-3" @submit.prevent="add()">
      <div class="border-2 border-gray-600">
        <input v-model="newAssigment" class="p-2" placeholder="New assigment ..." type="text" />
        <button class="p-2 border-l-2 border-gray-600" type="submit">Add</button>
      </div>
    </form>
  `,

  data() {
    return {
      newAssigment: "",
    }
  },

  methods: {
    add() {
      if (this.newAssigment.trim() === "") return
      this.$emit("add", this.newAssigment)
      this.newAssigment = ""
    },
  },
}
