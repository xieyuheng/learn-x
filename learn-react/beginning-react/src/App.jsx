import { useState } from 'react';
import NoTodos from './components/NoTodos';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';

export default function App() {
  const initTodos = [
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
  ];

  const [todos, setTodos] = useState([...initTodos]);
  const [todoCount, setTodoCount] = useState(4);

  function addTodo(todoTitle) {
    const newTodo = { id: todoCount, title: todoTitle, isComplete: false };
    setTodos([newTodo, ...todos]);
    setTodoCount(count => count + 1);
  }

  return (
    <div className="my-10 flex justify-center items-center">
      <div className="border-2 p-4">
        <h2 className="py-2 font-bold text-xl">Todo App</h2>

        <TodoForm addTodo={addTodo} />

        {todos.length > 0 ? (
          <TodoList todos={todos} setTodos={setTodos} />
        ) : (
          <NoTodos />
        )}
      </div>
    </div>
  );
}
