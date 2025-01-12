import { NavLink, Outlet } from 'react-router-dom';

import './TableLayout.css'

export default function TablesLayout() {

  return (
    <div className='tables-container'>
      <header>
        <nav className={'tables-nav'}>
          <NavLink className="nav-link" to="shipping_cost_to_a_US_port">
            <p>Shipping cost to a US port</p>
          </NavLink>
          <NavLink className="nav-link" to="delivery_by_ship">
            <p>Delivery by ship</p>
          </NavLink>
          <NavLink className="nav-link" to="my_ports">
            <p>My ports</p>
          </NavLink>
          <NavLink className="nav-link" to="iaai_fees">
            <p>IAAI fees</p>
          </NavLink>
          <NavLink className="nav-link" to="copart_fees">
            <p>Copart fees</p>
          </NavLink>
          <NavLink className="nav-link" to="excise">
            <p>Akcyza</p>
          </NavLink>
          <NavLink className="nav-link" to="clo">
            <p>Clo</p>
          </NavLink>
        </nav>
      </header>

      <div className="content">
        <Outlet />
      </div>
    </div>
  );
}
