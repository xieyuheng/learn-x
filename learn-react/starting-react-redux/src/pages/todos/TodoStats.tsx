import { useSelector } from 'react-redux';
import { selectTodos } from './todoSlice';

export default function TodoStats() {
  const todos = useSelector(selectTodos);

  function remaining() {
    return todos.filter((todo) => !todo.isComplete).length;
  }

  return <span>{remaining()} remaining</span>;
}
