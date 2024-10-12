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

import { RootLayout, LogInLayout, TablesLayout } from '../src/layouts/index.ts';

import './index.css';
import './reset.css';
import AuthProvider from './utils/AuthProvider.tsx';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { DeliveryByShip, MyPorts, ShippingCostToAUSPort } from './components/Tables/index.ts';

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
        index: true,
        element: <Navigate to="calculator" replace={true} />,
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
            path: 'tables',
            element: <TablesLayout />,
            children: [
              {
                index: true,
                element: (
                  <Navigate to="shipping_cost_to_a_US_port" replace={true} />
                ),
              },
              {
                path: 'shipping_cost_to_a_US_port',
                element: <ShippingCostToAUSPort />,
              },
              {
                path: 'delivery_by_ship',
                element: <DeliveryByShip />,
              },
              {
                path: 'my_ports',
                element: <MyPorts />,
              },
            ],
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
      <ToastContainer />
    </AuthProvider>
  </StrictMode>,
);
