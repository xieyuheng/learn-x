import AssigmentList from "./AssigmentList.js"

export default {
  components: { AssigmentList },

  template: `
    <assigment-list :assigments="filters.inProgress" title="In Progress"></assigment-list>
    <assigment-list :assigments="filters.completed" title="Completed"></assigment-list>
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
}
