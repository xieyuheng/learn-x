import { useSelector } from 'react-redux';
import * as state from './todoSlice';

export default function TodoStats() {
  const remaining = useSelector(state.selectors.remaining);

  return <span>{remaining} remaining</span>;
}
