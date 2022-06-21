import { createRef } from 'react';
import classNames from 'classnames';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import '../../styles/transitions/index.css';
import { TodoState } from './TodoState';
import { observer } from 'mobx-react';

export default observer(({ state }: { state: TodoState }) => (
  <TransitionGroup component="ul">
    {state.todosFiltered.map(todo => {
      const nodeRef = createRef<HTMLLIElement>();

      return (
        <CSSTransition
          nodeRef={nodeRef}
          key={todo.id}
          timeout={300}
          classNames="slide-from-right"
        >
          <li ref={nodeRef} className="flex justify-between py-2">
            <div className="flex items-center ">
              <input
                type="checkbox"
                checked={todo.isComplete}
                onChange={() => {
                  todo.isComplete = !todo.isComplete;
                }}
              />
              <div className="px-2">
                {!todo.isEditing ? (
                  <div
                    className={classNames({
                      'line-through': todo.isComplete,
                    })}
                    onDoubleClick={() => {
                      todo.isEditing = true;
                    }}
                  >
                    {todo.title}
                  </div>
                ) : (
                  <input
                    className="border-2"
                    type="text"
                    defaultValue={todo.title}
                    autoFocus
                    onBlur={event => {
                      todo.title = event.currentTarget.value;
                      todo.isEditing = false;
                    }}
                    onKeyDown={event => {
                      if (event.key === 'Enter') {
                        todo.title = event.currentTarget.value;
                        todo.isEditing = false;
                      }
                    }}
                  />
                )}
              </div>
            </div>
            <button
              className="text-gray-600"
              onClick={() => state.deleteTodo(todo.id)}
            >
              <div className="font-bold">X</div>
            </button>
          </li>
        </CSSTransition>
      );
    })}
  </TransitionGroup>
));
