import TodoPage from './pages/todos/TodoPage';
import AboutPage from './pages/about/AboutPage';
import EchoPage from './pages/echo/EchoPage';
import PageNotFound from './pages/errors/PageNotFound';

export const routes = [
  { path: '/', component: TodoPage },
  { path: '/about', component: AboutPage },
  { path: '/echo/:value', component: EchoPage },
  { path: '*', component: PageNotFound },
];
