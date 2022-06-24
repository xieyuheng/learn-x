import { createRef } from 'react';
import classNames from 'classnames';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import '../../styles/transitions/index.css';
import { useSelector, useDispatch } from 'react-redux';
import * as state from './todoSlice';

export default function TodoList() {
  const dispatch = useDispatch();
  const todos = useSelector(state.selectors.todos);
  const filterName = useSelector(state.selectors.filterName);
  const todosFiltered = useSelector(state.selectors.todosFiltered);

  return (
    <TransitionGroup component="ul">
      {todosFiltered.map((todo) => {
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
                  onChange={() => dispatch(state.actions.completeTodo(todo.id))}
                />
                <div className="px-2">
                  {!todo.isEditing ? (
                    <div
                      className={classNames({
                        'line-through': todo.isComplete,
                      })}
                      onDoubleClick={() =>
                        dispatch(state.actions.editingTodo(todo.id))
                      }
                    >
                      {todo.title}
                    </div>
                  ) : (
                    <input
                      className="border-2"
                      type="text"
                      defaultValue={todo.title}
                      autoFocus
                      onBlur={(event) =>
                        dispatch(
                          state.actions.updateTodo(
                            todo.id,
                            event.currentTarget.value
                          )
                        )
                      }
                      onKeyDown={(event) => {
                        if (event.key === 'Enter') {
                          dispatch(
                            state.actions.updateTodo(
                              todo.id,
                              event.currentTarget.value
                            )
                          );
                        }
                      }}
                    />
                  )}
                </div>
              </div>
              <button
                className="text-gray-600"
                onClick={() => dispatch(state.actions.deleteTodo(todo.id))}
              >
                <div className="font-bold">X</div>
              </button>
            </li>
          </CSSTransition>
        );
      })}
    </TransitionGroup>
  );
}
