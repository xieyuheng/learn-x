import classNames from 'classnames';
import { TodoState } from './TodoState';

export default function TodoFilters(props: { state: TodoState }) {
  const { filterName, setFilterName } = props.state;

  return (
    <div className="flex justify-between pb-2">
      <button
        className={classNames('border-2 p-2', {
          'border-rose-300 bg-rose-100': filterName === 'all',
        })}
        onClick={() => setFilterName('all')}
      >
        All
      </button>
      <button
        className={classNames('border-2 p-2', {
          'border-rose-300 bg-rose-100': filterName === 'active',
        })}
        onClick={() => setFilterName('active')}
      >
        Active
      </button>
      <button
        className={classNames('border-2 p-2', {
          'border-rose-300 bg-rose-100': filterName === 'completed',
        })}
        onClick={() => setFilterName('completed')}
      >
        Completed
      </button>
    </div>
  );
}
