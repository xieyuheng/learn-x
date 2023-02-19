export default {
  template: `
    <li>
      <label>
        {{ assigment.name }}
        <input type="checkbox" v-model="assigment.complete" />
      </label>
    </li>
  `,

  props: {
    assigment: Object,
  },
}
