import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from 'react-router-dom';
import App from './App.tsx';
import { LoginForm } from './components/index.ts';

import { RootLayout, LogInLayout } from '../src/layouts/index.ts';

import './index.css';
import './reset.css';

const router = createBrowserRouter([
  // {
  //   path: '/login/',
  //   element: <LoginForm />,
  // },
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        path: 'settings',
        element: <Navigate to="profile" replace={true} />,
        children: [
          {
            path: 'profile',
            element: '',
          },
          {
            path: 'users',
            element: '',
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
    ],
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
