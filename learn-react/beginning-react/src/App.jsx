import TodoPage from './pages/todos/TodoPage';
import AboutPage from './pages/about/AboutPage';
import EchoPage from './pages/echo/EchoPage';
import PageNotFound from './pages/errors/PageNotFound';
import Navbar from './pages/Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

export default function App() {
  const routes = [
    { path: '/', component: TodoPage },
    { path: '/about', component: AboutPage },
    { path: '/echo/:value', component: EchoPage },
    { path: '*', component: PageNotFound },
  ];

  return (
    <BrowserRouter>
      <div className="my-10 flex flex-col justify-center items-center">
        <Navbar />

        <div className="my-4">
          <Routes>
            {routes.map(({ path, component: Component }) => (
              <Route key={path} path={path} element={<Component />} />
            ))}
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}
