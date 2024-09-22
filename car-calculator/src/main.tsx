import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import {
  createBrowserRouter,
  Navigate,
  Outlet,
  RouterProvider,
} from 'react-router-dom';
import App from './App.tsx';
import { LoginForm, PersonalInfo, Users } from './components/index.ts';

import { RootLayout, LogInLayout } from '../src/layouts/index.ts';

import './index.css';
import './reset.css';
import AuthProvider from './utils/AuthProvider.tsx';

const router = createBrowserRouter([
  {
    path: '/login',
    element: <LoginForm />,
  },
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        path: 'carfax',
        element: '',
      },
      {
        path: 'autocheck',
        element: '',
      },
      {
        path: 'sticker',
        element: '',
      },
      {
        path: 'clients',
        element: '',
      },
      {
        path: 'calculator',
        element: <App />,
      },
      {
        path: 'settings',
        element: <Outlet />,
        children: [
          {
            index: true,
            element: <Navigate to="profile" replace={true} />,
          },
          {
            path: 'profile',
            element: <PersonalInfo />,
          },
          {
            path: 'users/',
            element: <Users />,
          },
          {
            path: 'calculator',
            element: '',
          },
          {
            path: 'shipping',
            element: '',
          },
        ],
      },
    ],
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
);
