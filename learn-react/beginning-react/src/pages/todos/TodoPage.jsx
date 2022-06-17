import { useState, useRef } from 'react';
import NoTodos from './NoTodos';
import TodoForm from './TodoForm';
import TodoList from './TodoList';
import TodoToolbar from './TodoToolbar';
import useLocalStorage from '../../hooks/useLocalStorage';
import { SwitchTransition, CSSTransition } from 'react-transition-group';
import '../../styles/transitions/index.css';

export default function TodoPage() {
  const [todos, setTodos] = useLocalStorage('todos', []);
  const [filterName, setFilterName] = useState('all');

  const refTodoList = useRef(null);
  const refNoTodos = useRef(null);

  return (
    <div className="border-2 p-4">
      <h2 className="py-2 font-bold text-xl">Todo App</h2>

      <TodoForm todos={todos} setTodos={setTodos} />
      <SwitchTransition mode="out-in">
        <CSSTransition
          key={todos.length > 0}
          timeout={300}
          classNames="slide-from-top"
          unmountOnExit
        >
          {todos.length > 0 ? (
            <div ref={refTodoList}>
              <TodoList
                todos={todos}
                setTodos={setTodos}
                filterName={filterName}
              />
              <TodoToolbar
                todos={todos}
                setTodos={setTodos}
                filterName={filterName}
                setFilterName={setFilterName}
              />
            </div>
          ) : (
            <NoTodos ref={refNoTodos} />
          )}
        </CSSTransition>
      </SwitchTransition>
    </div>
  );
}
