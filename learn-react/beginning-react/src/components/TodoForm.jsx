import { useState } from 'react';

export default function TodoForm(props) {
  const [todoInput, setTodoInput] = useState('');

  function handleSubmit(event) {
    event.preventDefault();
    if (!todoInput.trim()) return;
    props.addTodo(todoInput);
    setTodoInput('');
  }

  function handleInput(event) {
    setTodoInput(event.target.value);
  }

  return (
    <form className="border-2" action="#" onSubmit={handleSubmit}>
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
