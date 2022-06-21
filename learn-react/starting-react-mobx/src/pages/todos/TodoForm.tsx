import { TodoState } from './TodoState';
import { observer } from 'mobx-react';

export default observer(({ state }: { state: TodoState }) => (
  <form
    className="border-2"
    action="#"
    onSubmit={event => {
      event.preventDefault();
      state.addTodo();
    }}
  >
    <input
      className="p-2"
      type="text"
      placeholder="Add todo"
      value={state.todoInput}
      onChange={event => {
        state.todoInput = event.target.value;
      }}
    />
  </form>
));
