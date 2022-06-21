import TodoForm from './TodoForm';
import TodoBody from './TodoBody';
import { useState } from 'react';
import { TodoState } from './TodoState';
import { observer } from 'mobx-react';

export default observer(() => {
  const state = new TodoState();

  return (
    <div className="border-2 p-4">
      <h2 className="py-2 font-bold text-xl">Todo App</h2>

      <TodoForm state={state} />
      <TodoBody state={state} />
    </div>
  );
});
