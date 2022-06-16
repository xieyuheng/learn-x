import { useState } from 'react';
import TodoStats from './TodoStats';
import TodoFilters from './TodoFilters';
import classNames from 'classnames';

export default function TodoList(props) {
  const { todos, setTodos } = props;

  const [filterName, setFilterName] = useState('all');

  function deleteTodo(id) {
    setTodos([...todos.filter(todo => todo.id !== id)]);
  }

  function completeTodo(id) {
    setTodos([
      ...todos.map(todo => {
        // NOTE Is it OK to use this side effect here?
        //   Is it true that side effect is OK but not enough?
        //   If this kind of side effects are OK,
        //   I think we can use MVVM in React.
        if (todo.id === id) {
          todo.isComplete = !todo.isComplete;
        }

        return todo;
      }),
    ]);
  }

  function editingTodo(id) {
    setTodos([
      ...todos.map(todo => {
        if (todo.id === id) {
          todo.isEditing = true;
        }

        return todo;
      }),
    ]);
  }

  function updateTodo(event, id) {
    setTodos([
      ...todos.map(todo => {
        if (todo.id === id) {
          todo.isEditing = false;
          if (event.target.value.trim() !== '') {
            todo.title = event.target.value;
          }
        }

        return todo;
      }),
    ]);
  }

  function clearCompleted() {
    setTodos([...todos.filter(todo => !todo.isComplete)]);
  }

  function checkAll() {
    setTodos([
      ...todos.map(todo => {
        todo.isComplete = true;
        return todo;
      }),
    ]);
  }

  function todosFiltered() {
    switch (filterName) {
      case 'active':
        return todos.filter(todo => !todo.isComplete);
      case 'completed':
        return todos.filter(todo => todo.isComplete);
      case 'all':
      default:
        return todos;
    }
  }

  return (
    <>
      <ul>
        {todosFiltered().map(todo => (
          <li key={todo.id} className="flex justify-between py-2">
            <div className="flex items-center ">
              <input
                type="checkbox"
                checked={todo.isComplete}
                onChange={() => completeTodo(todo.id)}
              />
              <div className="px-2">
                {!todo.isEditing ? (
                  <div
                    className={classNames({ 'line-through': todo.isComplete })}
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
                    onBlur={event => updateTodo(event, todo.id)}
                    onKeyDown={event => {
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
        ))}
      </ul>

      <div className="flex border-t-2 py-2 items-center justify-between">
        <button className="border-2 p-2" onClick={() => checkAll()}>
          Check All
        </button>
        <TodoStats todos={todos} />
      </div>

      <div className="flex flex-col border-t-2 py-2">
        <TodoFilters filterName={filterName} setFilterName={setFilterName} />

        <button className="border-2 p-2" onClick={() => clearCompleted()}>
          Clear completed
        </button>
      </div>
    </>
  );
}
