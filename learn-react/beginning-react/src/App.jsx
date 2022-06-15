import { useState } from 'react';
import './App.css';

function App() {
  const [todos, setTodos] = useState([
    {
      id: 3,
      title: 'Get some sleep',
      isComplete: true,
      isEditing: false,
    },
    {
      id: 2,
      title: 'Eat something',
      isComplete: true,
      isEditing: false,
    },
    {
      id: 1,
      title: 'Finish React Series',
      isComplete: false,
      isEditing: false,
    },
  ]);

  const [todoInput, setTodoInput] = useState('');
  const [todoCount, setTodoCount] = useState(4);

  function addTodo(event) {
    event.preventDefault();

    if (!todoInput.trim()) return;

    const newTodo = { id: todoCount, title: todoInput, isComplete: false };
    setTodos([newTodo, ...todos]);
    setTodoCount(count => count + 1);
    setTodoInput('');
  }

  function handleInput(event) {
    setTodoInput(event.target.value);
  }

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
    console.log('updateTodo');

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

  return (
    <div className="my-10 flex justify-center items-center">
      <div className="border-2 p-4">
        <h2 className="py-2 font-bold text-xl">Todo App</h2>
        <form className="border-2" action="#" onSubmit={addTodo}>
          <input
            className="p-2"
            type="text"
            placeholder="Add todo"
            value={todoInput}
            onChange={handleInput}
          />
        </form>

        <ul>
          {todos.map(todo => (
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
                      className={`${todo.isComplete ? 'line-through' : ''}`}
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
                X
              </button>
            </li>
          ))}
        </ul>

        <div className="flex border-t-2 py-2 items-center justify-between">
          <button className="border-2 p-2">Check All</button>

          <span>3 items remaining</span>
        </div>

        <div className="flex flex-col border-t-2 py-2">
          <div className="flex justify-between pb-2">
            <button className="border-2 p-2">All</button>
            <button className="border-2 p-2">Active</button>
            <button className="border-2 p-2">Completed</button>
          </div>

          <button className="border-2 p-2">Clear completed</button>
        </div>
      </div>
    </div>
  );
}

export default App;
