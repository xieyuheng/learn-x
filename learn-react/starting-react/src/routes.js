import TodoPage from './pages/todos/TodoPage';
import AboutPage from './pages/about/AboutPage';
import EchoPage from './pages/play/EchoPage';
import FetchPage from './pages/play/FetchPage';
import PageNotFound from './pages/errors/PageNotFound';

export const routes = [
  { path: '/', component: TodoPage },
  { path: '/about', component: AboutPage },
  { path: '/play/echo/:value', component: EchoPage },
  { path: '/play/fetch', component: FetchPage },
  { path: '*', component: PageNotFound },
];
