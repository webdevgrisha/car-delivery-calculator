import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import {
  createBrowserRouter,
  Navigate,
  Outlet,
  RouterProvider,
} from 'react-router-dom';
import { Calculator, CalculatorSettings, LoginForm, PersonalInfo, Users } from './components/index.ts';

import { RootLayout, TablesLayout } from '../src/layouts/index.ts';

import './index.css';
import './reset.css';
import AuthProvider from './utils/AuthProvider.tsx';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  Clo,
  CopartFees,
  DeliveryByShip,
  Excise,
  IAAIFees,
  MyPorts,
  ShippingCostToAUSPort,
} from './components/Tables/index.ts';

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
        element: <Calculator />,
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
            element: <CalculatorSettings />,
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
              {
                path: 'iaai_fees',
                element: <IAAIFees />,
              },
              {
                path: 'copart_fees',
                element: <CopartFees />,
              },
              {
                path: 'excise',
                element: <Excise />,
              },
              {
                path: 'clo',
                element: <Clo />,
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
