import { NavLink } from 'react-router-dom';
import classNames from 'classnames';

export default function Navbar() {
  return (
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
  );
}
