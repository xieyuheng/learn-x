import { TodoState } from './TodoState';
import { useSelector, useDispatch } from 'react-redux';
import {
  todoSlice,
  setTodos,
  setFilterName,
  selectTodos,
  selectFilterName,
} from './todoSlice';

export default function TodoStats() {
  const todos = useSelector(selectTodos);

  function remaining() {
    return todos.filter((todo) => !todo.isComplete).length;
  }

  return <span>{remaining()} remaining</span>;
}
