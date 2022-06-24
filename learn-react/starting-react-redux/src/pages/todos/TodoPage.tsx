import NoTodos from './NoTodos';
import TodoForm from './TodoForm';
import TodoList from './TodoList';
import TodoToolbar from './TodoToolbar';
import { SwitchTransition, CSSTransition } from 'react-transition-group';
import '../../styles/transitions/index.css';
import { useSelector } from 'react-redux';
import { selectTodos } from './todoSlice';
import * as state from './todoSlice';

export default function TodoPage() {
  const todos = useSelector(selectTodos);

  return (
    <div className="border-2 p-4">
      <h2 className="py-2 font-bold text-xl">Todo App</h2>

      <TodoForm />
      <SwitchTransition mode="out-in">
        <CSSTransition
          key={todos.length > 0 ? 1 : 0}
          timeout={300}
          classNames="slide-from-top"
          unmountOnExit
        >
          {todos.length > 0 ? (
            <div>
              <TodoList />
              <TodoToolbar />
            </div>
          ) : (
            <NoTodos />
          )}
        </CSSTransition>
      </SwitchTransition>
    </div>
  );
}
