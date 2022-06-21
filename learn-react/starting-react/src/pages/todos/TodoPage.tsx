import { useState } from 'react';
import NoTodos from './NoTodos';
import TodoForm from './TodoForm';
import TodoList from './TodoList';
import { TodoState } from './TodoState';
import TodoToolbar from './TodoToolbar';
import useLocalStorage from '../../hooks/useLocalStorage';
import { SwitchTransition, CSSTransition } from 'react-transition-group';
import '../../styles/transitions/index.css';

export default function TodoPage() {
  const [todos, setTodos] = useLocalStorage('todos', []);
  const [filterName, setFilterName] = useState('all');

  const state: TodoState = { todos, setTodos, filterName, setFilterName };

  return (
    <div className="border-2 p-4">
      <h2 className="py-2 font-bold text-xl">Todo App</h2>

      <TodoForm state={state} />
      <SwitchTransition mode="out-in">
        <CSSTransition
          key={todos.length > 0 ? 1 : 0}
          timeout={300}
          classNames="slide-from-top"
          unmountOnExit
        >
          {todos.length > 0 ? (
            <div>
              <TodoList state={state} />
              <TodoToolbar state={state} />
            </div>
          ) : (
            <NoTodos />
          )}
        </CSSTransition>
      </SwitchTransition>
    </div>
  );
}
