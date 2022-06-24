import classNames from 'classnames';
import { useSelector, useDispatch } from 'react-redux';
import { setFilterName, selectFilterName } from './todoSlice';

export default function TodoFilters() {
  const dispatch = useDispatch();

  const filterName = useSelector(selectFilterName);

  return (
    <div className="flex justify-between pb-2">
      <button
        className={classNames('border-2 p-2', {
          'border-rose-300 bg-rose-100': filterName === 'all',
        })}
        onClick={() => dispatch(setFilterName('all'))}
      >
        All
      </button>
      <button
        className={classNames('border-2 p-2', {
          'border-rose-300 bg-rose-100': filterName === 'active',
        })}
        onClick={() => dispatch(setFilterName('active'))}
      >
        Active
      </button>
      <button
        className={classNames('border-2 p-2', {
          'border-rose-300 bg-rose-100': filterName === 'completed',
        })}
        onClick={() => dispatch(setFilterName('completed'))}
      >
        Completed
      </button>
    </div>
  );
}
