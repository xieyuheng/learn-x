import TodoForm from './TodoForm';
import TodoBody from './TodoBody';
import { TodoState } from './TodoState';
import useTodoState from './useTodoState';
import { observer } from 'mobx-react-lite';
import { autorun } from 'mobx';

export default observer(() => {
  const { state, saveState } = useTodoState();

  autorun(() => saveState(state));

  return (
    <div className="border-2 p-4">
      <h2 className="py-2 font-bold text-xl">Todo App</h2>

      <TodoForm state={state} />
      <TodoBody state={state} />
    </div>
  );
});
