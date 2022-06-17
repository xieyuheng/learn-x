import { useState } from 'react';

export default function TodoForm(props) {
  const { todos, setTodos } = props;

  const [todoInput, setTodoInput] = useState('');

  function freshId() {
    const ids = todos.map(todo => todo.id);
    if (ids.length === 0) return 0;
    return Math.max(...ids) + 1;
  }

  function addTodo(event) {
    event.preventDefault();
    if (!todoInput.trim()) return;
    const newTodo = { id: freshId(), title: todoInput, isComplete: false };
    setTodos([newTodo, ...todos]);
    setTodoInput('');
  }

  function handleInput(event) {
    setTodoInput(event.target.value);
  }

  return (
    <form className="border-2" action="#" onSubmit={addTodo}>
      <input
        className="p-2"
        type="text"
        placeholder="Add todo"
        value={todoInput}
        onChange={handleInput}
      />
    </form>
  );
}
