import { CSSTransition, TransitionGroup } from 'react-transition-group';
import TodoListItem from './TodoListItem';
import { TodoState } from './TodoState';
import { observer } from 'mobx-react';

export default observer(({ state }: { state: TodoState }) => (
  <TransitionGroup component="ul">
    {state.todosFiltered.map(todo => (
      <CSSTransition key={todo.id} timeout={300} classNames="slide-from-right">
        <TodoListItem state={state} todo={todo} key={todo.id} />
      </CSSTransition>
    ))}
  </TransitionGroup>
));
