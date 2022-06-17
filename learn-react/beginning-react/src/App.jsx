import TodoPage from './pages/todos/TodoPage';
import AboutPage from './pages/about/AboutPage';
import EchoPage from './pages/echo/EchoPage';
import PageNotFound from './pages/errors/PageNotFound';
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import classNames from 'classnames';

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
        <nav>
          <ul className="flex space-x-2">
            <li>
              <NavLink
                className={nav =>
                  classNames('border-2 p-2', {
                    'border-rose-300 bg-rose-100': nav.isActive,
                  })
                }
                to="/"
              >
                HOME
              </NavLink>
            </li>

            <li>
              <NavLink
                className={nav =>
                  classNames('border-2 p-2', {
                    'border-rose-300 bg-rose-100': nav.isActive,
                  })
                }
                to="/about"
              >
                ABOUT
              </NavLink>
            </li>

            <li>
              <NavLink
                className={nav =>
                  classNames('border-2 p-2', {
                    'border-rose-300 bg-rose-100': nav.isActive,
                  })
                }
                to="/echo/hello"
              >
                ECHO
              </NavLink>
            </li>
          </ul>
        </nav>

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
