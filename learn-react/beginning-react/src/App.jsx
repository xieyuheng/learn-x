import { useState } from 'react';
import './App.css';

function App() {
  const [todos, setTodos] = useState([
    { id: 3, title: 'Get some sleep', isComplete: true },
    { id: 2, title: 'Eat something', isComplete: true },
    { id: 1, title: 'Finish React Series', isComplete: false },
  ]);

  const [todoInput, setTodoInput] = useState('');
  const [todoId, setTodoId] = useState(4);

  function addTodo(event) {
    event.preventDefault();

    if (!todoInput.trim()) return;

    setTodos([
      {
        id: todoId,
        title: todoInput,
        isComplete: false,
      },
      ...todos,
    ]);

    setTodoId(id => id + 1);
  }

  function handleInput(event) {
    setTodoInput(event.target.value);
  }

  return (
    <div className="h-screen flex justify-center items-center">
      <div className="border-2 p-4">
        <h2 className="py-2 font-bold text-xl">Todo App</h2>
        <form className="shadow" action="#" onSubmit={addTodo}>
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
              <div>
                <input name="" type="checkbox" value="" />
                <span className="pl-2">{todo.title}</span>
              </div>
              <botton>X</botton>
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
