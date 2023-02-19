import AssigmentList from "./AssigmentList.js"
import AssigmentCreate from "./AssigmentCreate.js"

export default {
  components: { AssigmentList, AssigmentCreate },

  template: `
    <assigment-list :assigments="filters.inProgress" title="In Progress"></assigment-list>
    <assigment-list :assigments="filters.completed" title="Completed"></assigment-list>

    <assigment-create @add="add"></assigment-create>
  `,

  data() {
    return {
      assigments: [
        { name: "Finish project", complete: false, id: 1 },
        { name: "Read chapter 4", complete: false, id: 2 },
        { name: "Turn in homework", complete: false, id: 3 },
      ],
    }
  },

  computed: {
    filters() {
      return {
        inProgress: this.assigments.filter((assigment) => !assigment.complete),
        completed: this.assigments.filter((assigment) => assigment.complete),
      }
    },
  },

  methods: {
    add(name) {
      this.assigments.push({
        name,
        complete: false,
        id: this.assigments.length,
      })
    },
  }
}
