import Assigment from "./Assigment.js"

export default {
  components: { Assigment },

  template: `
    <section v-show="assigments.length">
      <h2 class="font-bold py-2">{{ title }}</h2>

      <ul>
        <assigment
          v-for="assigment in assigments"
          :key="assigment.id"
          :assigment="assigment"
        ></assigment>
      </ul>
    </section>
  `,

  props: {
    assigments: Array,
    title: String,
  },
}
