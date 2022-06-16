import NoTodos from './components/NoTodos';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import useLocalStorage from './hooks/useLocalStorage';

export default function App() {
  const [todos, setTodos] = useLocalStorage('todos', []);

  return (
    <div className="my-10 flex justify-center items-center">
      <div className="border-2 p-4">
        <h2 className="py-2 font-bold text-xl">Todo App</h2>

        <TodoForm todos={todos} setTodos={setTodos} />

        {todos.length > 0 ? (
          <TodoList todos={todos} setTodos={setTodos} />
        ) : (
          <NoTodos />
        )}
      </div>
    </div>
  );
}
