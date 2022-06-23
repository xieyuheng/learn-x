import { createRef } from 'react';
import classNames from 'classnames';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import '../../styles/transitions/index.css';
import { TodoState } from './TodoState';

export default function TodoList(props: { state: TodoState }) {
  const { todos, setTodos, filterName } = props.state;

  function deleteTodo(id: number) {
    setTodos([...todos.filter((todo) => todo.id !== id)]);
  }

  function completeTodo(id: number) {
    setTodos([
      ...todos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, isComplete: !todo.isComplete };
        }

        return todo;
      }),
    ]);
  }

  function editingTodo(id: number) {
    setTodos([
      ...todos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, isEditing: true };
        }

        return todo;
      }),
    ]);
  }

  function updateTodo(
    event:
      | React.FocusEvent<HTMLInputElement, Element>
      | React.KeyboardEvent<HTMLInputElement>,
    id: number
  ) {
    setTodos([
      ...todos.map((todo) => {
        if (todo.id === id) {
          todo.isEditing = false;
          if (event.currentTarget.value.trim() !== '') {
            todo.title = event.currentTarget.value;
          }
        }

        return todo;
      }),
    ]);
  }

  function todosFiltered() {
    switch (filterName) {
      case 'active':
        return todos.filter((todo) => !todo.isComplete);
      case 'completed':
        return todos.filter((todo) => todo.isComplete);
      case 'all':
      default:
        return todos;
    }
  }

  return (
    <TransitionGroup component="ul">
      {todosFiltered().map((todo) => {
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
                  onChange={() => completeTodo(todo.id)}
                />
                <div className="px-2">
                  {!todo.isEditing ? (
                    <div
                      className={classNames({
                        'line-through': todo.isComplete,
                      })}
                      onDoubleClick={() => editingTodo(todo.id)}
                    >
                      {todo.title}
                    </div>
                  ) : (
                    <input
                      className="border-2"
                      type="text"
                      defaultValue={todo.title}
                      autoFocus
                      onBlur={(event) => updateTodo(event, todo.id)}
                      onKeyDown={(event) => {
                        if (event.key === 'Enter') {
                          updateTodo(event, todo.id);
                        }
                      }}
                    />
                  )}
                </div>
              </div>
              <button
                className="text-gray-600"
                onClick={() => deleteTodo(todo.id)}
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
