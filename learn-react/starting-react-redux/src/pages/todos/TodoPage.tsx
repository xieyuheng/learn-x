import NoTodos from './NoTodos';
import TodoForm from './TodoForm';
import TodoList from './TodoList';
import { TodoState } from './TodoState';
import TodoToolbar from './TodoToolbar';
import { SwitchTransition, CSSTransition } from 'react-transition-group';
import '../../styles/transitions/index.css';
import { useSelector, useDispatch } from 'react-redux';
import { todoSlice, selectTodos, selectFilterName } from './todoSlice';

export default function TodoPage() {
  const dispatch = useDispatch();

  const todos = useSelector(selectTodos);
  const filterName = useSelector(selectFilterName);

  const state: TodoState = {
    todos,
    setTodos: (todos) => dispatch(todoSlice.actions.setTodos(todos)),
    filterName,
    setFilterName: (filterName) =>
      dispatch(todoSlice.actions.setFilterName(filterName)),
  };

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
