import { NavLink, Outlet } from 'react-router-dom';

import './TableLayout.css'

export default function TablesLayout() {
  return (
    <div className='tables-container'>
      <header>
        <nav className={'tables-nav'}>
          <NavLink className="nav-link" to="a">
            <p>Shipping cost to a US port</p>
          </NavLink>
          <NavLink className="nav-link" to="b">
            <p>Delivery by ship</p>
          </NavLink>
          <NavLink className="nav-link" to="my_ports">
            <p>My ports</p>
          </NavLink>
        </nav>
      </header>

      <div className="content">
        <Outlet />
      </div>
    </div>
  );
}
