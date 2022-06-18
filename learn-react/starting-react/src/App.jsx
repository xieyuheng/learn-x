import Navbar from './Navbar';
import { routes } from './routes';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

export default function App() {
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
