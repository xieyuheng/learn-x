export default function TodoList(props) {
  const { todos } = props;

  function remaining() {
    return todos.filter(todo => !todo.isComplete).length;
  }

  return <span>{remaining()} items remaining</span>;
}
