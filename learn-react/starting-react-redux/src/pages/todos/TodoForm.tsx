import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as state from './todoSlice';

export default function TodoForm() {
  const dispatch = useDispatch();
  const todos = useSelector(state.selectors.todos);
  const todoInput = useSelector(state.selectors.todoInput);

  return (
    <form
      className="border-2"
      action="#"
      onSubmit={(event) => {
        event.preventDefault();
        dispatch(state.actions.addTodo());
      }}
    >
      <input
        className="p-2"
        type="text"
        placeholder="Add todo"
        value={todoInput}
        onChange={(event) =>
          dispatch(state.actions.setTodoInput(event.target.value))
        }
      />
    </form>
  );
}
