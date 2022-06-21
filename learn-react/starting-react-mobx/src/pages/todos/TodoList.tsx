import { CSSTransition, TransitionGroup } from 'react-transition-group';
import TodoListItem from './TodoListItem';
import { TodoState } from './TodoState';
import { observer } from 'mobx-react';

export default observer(({ state }: { state: TodoState }) => (
  <TransitionGroup component="ul">
    {state.todosFiltered.map(todo => (
      <CSSTransition key={todo.id} timeout={300} classNames="slide-from-right">
        <li key={todo.id} className="flex justify-between py-2">
          <TodoListItem state={state} todo={todo} />
          <button
            className="text-gray-600"
            onClick={() => state.deleteTodo(todo.id)}
          >
            <div className="font-bold">X</div>
          </button>
        </li>
      </CSSTransition>
    ))}
  </TransitionGroup>
));
