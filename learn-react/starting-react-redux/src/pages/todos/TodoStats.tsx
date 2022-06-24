import { useSelector } from 'react-redux';
import { selectTodos, selectRemaining } from './todoSlice';
import * as state from './todoSlice';

export default function TodoStats() {
  const todos = useSelector(selectTodos);
  const remaining = useSelector(selectRemaining);

  return <span>{remaining} remaining</span>;
}
