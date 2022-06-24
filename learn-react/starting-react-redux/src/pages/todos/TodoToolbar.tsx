import TodoStats from './TodoStats';
import TodoFilters from './TodoFilters';
import { useSelector, useDispatch } from 'react-redux';
import * as state from './todoSlice';
import { selectTodos } from './todoSlice';

export default function TodoToolbar() {
  const dispatch = useDispatch();

  const todos = useSelector(selectTodos);

  function checkAll() {
    dispatch(
      state.actions.setTodos([
        ...todos.map((todo) => ({ ...todo, isComplete: true })),
      ])
    );
  }

  return (
    <>
      <div className="flex border-t-2 py-2 items-center justify-between">
        <button className="border-2 p-2" onClick={() => checkAll()}>
          Check All
        </button>
        <TodoStats />
      </div>

      <div className="flex flex-col border-t-2 py-2">
        <TodoFilters />

        <button
          className="border-2 p-2"
          onClick={() => dispatch(state.actions.clearCompleted())}
        >
          Clear completed
        </button>
      </div>
    </>
  );
}
