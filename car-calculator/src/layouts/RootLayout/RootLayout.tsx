import { Outlet, NavLink, useMatch } from 'react-router-dom';

import './RootLayout.css';
import { useState } from 'react';

import { userSignOut } from '../../services/firebase/auth';
import { useAuth } from '../../utils/AuthProvider';

import {
  SVG_Email,
  SVG_User,
  SVG_CarFax,
  SVG_Autocheck,
  SVG_Sticekr,
  SVG_Clients,
  SVG_Calculator,
  SVG_Settings,
} from '../../assets';

export default function RootLayout() {
  const match = useMatch('/settings/*');
  const userData = useAuth();

  const email = userData.currentUser.email;
  const role = userData.currentUser.role;
  console.log('Auth: ', userData.currentUser.email);
  // console.log('match: ', match);
  // const [isSettingActive, setSettingActive] = useState<boolean>(false);

  const mainNavClass = match ? 'remove-p' : '';
  return (
    <div className="root-layout">
      <header>
        <div className="logo">
          <img src="/logo-black.png" alt="liberty cars logo" />
        </div>
        <div className="account-info email">
          <span className="icon">
            <SVG_Email />
          </span>
          <p>{email}</p>
        </div>
        <div className="account-info status">
          <span className="icon">
            <SVG_User />
          </span>
          <p>{role}</p>
        </div>
        <button className="logout-btn" onClick={userSignOut}>
          Logout
        </button>
      </header>
      <div className="app-container">
        <nav className={'main-nav ' + mainNavClass}>
          <NavLink className="nav-link" to="/">
            <span className="icon">
              <SVG_CarFax />
            </span>
            <p>CarFax</p>
          </NavLink>
          <NavLink className="nav-link" to="autocheck">
            <span className="icon">
              <SVG_Autocheck />
            </span>
            <p>Autocheck</p>
          </NavLink>
          <NavLink className="nav-link" to="sticker">
            <span className="icon">
              <SVG_Sticekr />
            </span>
            <p>Sticker</p>
          </NavLink>
          <NavLink className="nav-link" to="clients">
            <span className="icon">
              <SVG_Clients />
            </span>
            <p>Clients</p>
          </NavLink>
          <NavLink className="nav-link" to="calculator">
            <span className="icon">
              <SVG_Calculator />
            </span>
            <p>Calculator</p>
          </NavLink>

          <hr className="separator"></hr>

          <NavLink className="nav-link settings" to="settings">
            <span className="icon">
              <SVG_Settings />
            </span>
            <p>Settings</p>
          </NavLink>
        </nav>
        {match && (
          <nav className="settings-nav">
            <h3>Settings</h3>
            <NavLink className="nav-link" to="settings/profile">
              Profile
            </NavLink>
            <NavLink className="nav-link" to="settings/users">
              Users
            </NavLink>
            <NavLink className="nav-link" to="settings/calculator">
              Calculator
            </NavLink>
            <NavLink className="nav-link" to="settings/tables">
              Tables
            </NavLink>
          </nav>
        )}

        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
