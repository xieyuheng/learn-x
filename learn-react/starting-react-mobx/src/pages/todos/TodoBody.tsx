import NoTodos from './NoTodos';
import TodoList from './TodoList';
import { TodoState } from './TodoState';
import TodoToolbar from './TodoToolbar';
import { SwitchTransition, CSSTransition } from 'react-transition-group';
import '../../styles/transitions/index.css';
import { observer } from 'mobx-react';

export default observer(({ state }: { state: TodoState }) => (
  <SwitchTransition mode="out-in">
    <CSSTransition
      key={state.todos.length > 0 ? 1 : 0}
      timeout={300}
      classNames="slide-from-top"
      unmountOnExit
    >
      {state.todos.length > 0 ? (
        <div>
          <TodoList state={state} />
          <TodoToolbar state={state} />
        </div>
      ) : (
        <NoTodos />
      )}
    </CSSTransition>
  </SwitchTransition>
));
