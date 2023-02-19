export default {
  template: `
    <li>
      <label class="block p-2 flex justify-between">
        {{ assigment.name }}
        <input class="ml-3" type="checkbox" v-model="assigment.complete" />
      </label>
    </li>
  `,

  props: {
    assigment: Object,
  },
};
