import TodoPage from './pages/todos/TodoPage';
import AboutPage from './pages/about/AboutPage';

export default function App() {
  return (
    <div className="my-10 flex justify-center items-center">
      <div>
        <AboutPage />
        <TodoPage />
      </div>
    </div>
  );
}
