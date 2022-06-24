import TodoStats from './TodoStats';
import TodoFilters from './TodoFilters';
import { TodoState } from './TodoState';
import { useSelector, useDispatch } from 'react-redux';
import {
  todoSlice,
  setTodos,
  setFilterName,
  selectTodos,
  selectFilterName,
} from './todoSlice';

export default function TodoToolbar() {
  const dispatch = useDispatch();

  const todos = useSelector(selectTodos);
  const filterName = useSelector(selectFilterName);

  function clearCompleted() {
    dispatch(setTodos([...todos.filter((todo) => !todo.isComplete)]));
  }

  function checkAll() {
    dispatch(
      setTodos([...todos.map((todo) => ({ ...todo, isComplete: true }))])
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

        <button className="border-2 p-2" onClick={() => clearCompleted()}>
          Clear completed
        </button>
      </div>
    </>
  );
}
