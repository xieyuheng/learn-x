import { useRef } from 'react';
import NoTodos from './components/NoTodos';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import useLocalStorage from './hooks/useLocalStorage';
import { SwitchTransition, CSSTransition } from 'react-transition-group';
import './styles/transitions/index.css';

export default function App() {
  const [todos, setTodos] = useLocalStorage('todos', []);

  const refTodoList = useRef(null);
  const refNoTodos = useRef(null);

  return (
    <div className="my-10 flex justify-center items-center">
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
              <TodoList ref={refTodoList} todos={todos} setTodos={setTodos} />
            ) : (
              <NoTodos ref={refNoTodos} />
            )}
          </CSSTransition>
        </SwitchTransition>
      </div>
    </div>
  );
}
