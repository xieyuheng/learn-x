import Assigment from "./Assigment.js"

export default {
  components: { Assigment },

  template: `
    <section v-show="assigments.length">
      <h2 class="font-bold py-2">{{ title }}</h2>

      <ul class="border-2 border-gray-600 divide-y-2 divide-gray-600">
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
