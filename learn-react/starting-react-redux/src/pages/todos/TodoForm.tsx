import { useState } from 'react';
import { TodoState } from './TodoState';
import { useSelector, useDispatch } from 'react-redux';
import { setTodos, selectTodos } from './todoSlice';

export default function TodoForm() {
  const dispatch = useDispatch();

  const todos = useSelector(selectTodos);

  const [todoInput, setTodoInput] = useState('');

  function freshId() {
    const ids = todos.map((todo) => todo.id);
    if (ids.length === 0) return 0;
    return Math.max(...ids) + 1;
  }

  function addTodo(event: React.FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    if (!todoInput.trim()) return;
    const newTodo = { id: freshId(), title: todoInput, isComplete: false };
    dispatch(setTodos([newTodo, ...todos]));
    setTodoInput('');
  }

  function handleInput(event: React.ChangeEvent<HTMLInputElement>): void {
    setTodoInput(event.target.value);
  }

  return (
    <form className="border-2" action="#" onSubmit={(event) => addTodo(event)}>
      <input
        className="p-2"
        type="text"
        placeholder="Add todo"
        value={todoInput}
        onChange={(event) => handleInput(event)}
      />
    </form>
  );
}
