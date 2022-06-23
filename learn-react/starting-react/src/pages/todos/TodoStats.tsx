import { TodoState } from './TodoState';

export default function TodoStats(props: { state: TodoState }) {
  const { todos } = props.state;

  function remaining() {
    return todos.filter((todo) => !todo.isComplete).length;
  }

  return <span>{remaining()} remaining</span>;
}
