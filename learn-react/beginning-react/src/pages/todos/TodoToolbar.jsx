import TodoStats from './TodoStats';
import TodoFilters from './TodoFilters';

export default function TodoToolbar(props) {
  const { todos, setTodos, filterName, setFilterName } = props;

  function clearCompleted() {
    setTodos([...todos.filter(todo => !todo.isComplete)]);
  }

  function checkAll() {
    setTodos([
      ...todos.map(todo => {
        todo.isComplete = true;
        return todo;
      }),
    ]);
  }

  return (
    <>
      <div className="flex border-t-2 py-2 items-center justify-between">
        <button className="border-2 p-2" onClick={() => checkAll()}>
          Check All
        </button>
        <TodoStats todos={todos} />
      </div>

      <div className="flex flex-col border-t-2 py-2">
        <TodoFilters filterName={filterName} setFilterName={setFilterName} />

        <button className="border-2 p-2" onClick={() => clearCompleted()}>
          Clear completed
        </button>
      </div>
    </>
  );
}
