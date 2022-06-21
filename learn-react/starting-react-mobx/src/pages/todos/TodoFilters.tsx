import classNames from 'classnames';
import { TodoState } from './TodoState';
import { observer } from 'mobx-react';

export default observer(({ state }: { state: TodoState }) => (
  <div className="flex justify-between pb-2">
    <button
      className={classNames('border-2 p-2', {
        'border-rose-300 bg-rose-100': state.filterName === 'all',
      })}
      onClick={() => (state.filterName = 'all')}
    >
      All
    </button>
    <button
      className={classNames('border-2 p-2', {
        'border-rose-300 bg-rose-100': state.filterName === 'active',
      })}
      onClick={() => (state.filterName = 'active')}
    >
      Active
    </button>
    <button
      className={classNames('border-2 p-2', {
        'border-rose-300 bg-rose-100': state.filterName === 'completed',
      })}
      onClick={() => (state.filterName = 'completed')}
    >
      Completed
    </button>
  </div>
));
