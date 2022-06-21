import TodoStats from './TodoStats';
import TodoFilters from './TodoFilters';
import { TodoState } from './TodoState';
import { observer } from 'mobx-react';

export default observer(({ state }: { state: TodoState }) => (
  <>
    <div className="flex border-t-2 py-2 items-center justify-between">
      <button className="border-2 p-2" onClick={() => state.checkAll()}>
        Check All
      </button>
      <TodoStats state={state} />
    </div>

    <div className="flex flex-col border-t-2 py-2">
      <TodoFilters state={state} />

      <button className="border-2 p-2" onClick={() => state.clearCompleted()}>
        Clear completed
      </button>
    </div>
  </>
));
