import TodoStats from './TodoStats';
import TodoFilters from './TodoFilters';
import { TodoState } from './TodoState';

export default function TodoToolbar(props: { state: TodoState }) {
  const { state } = props;
  const { todos, setTodos } = state;

  function clearCompleted() {
    setTodos([...todos.filter((todo) => !todo.isComplete)]);
  }

  function checkAll() {
    setTodos([...todos.map((todo) => ({ ...todo, isComplete: true }))]);
  }

  return (
    <>
      <div className="flex border-t-2 py-2 items-center justify-between">
        <button className="border-2 p-2" onClick={() => checkAll()}>
          Check All
        </button>
        <TodoStats state={state} />
      </div>

      <div className="flex flex-col border-t-2 py-2">
        <TodoFilters state={state} />

        <button className="border-2 p-2" onClick={() => clearCompleted()}>
          Clear completed
        </button>
      </div>
    </>
  );
}
