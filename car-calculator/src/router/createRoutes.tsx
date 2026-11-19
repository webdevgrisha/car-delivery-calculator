import { createBrowserRouter, Navigate, Outlet } from 'react-router-dom';
import {
  Users,
  Calculator,
  PersonalInfo,
  LoginForm,
  CalculatorSettings,
} from '../components';
import {
  ShippingCostToAUSPort,
  DeliveryByShip,
  MyPorts,
  IAAIFees,
  CopartFees,
  Excise,
  Clo,
} from '../components/Tables';
import { TablesLayout, RootLayout } from '../layouts';

const createRouter = (role: 'admin' | 'user') => {
  const adminRoutes = [
    {
      path: 'settings',
      element: <Outlet />,
      children: [
        {
          index: true,
          element: <Navigate to="profile" replace={true} />,
        },
        // {
        //   path: 'profile',
        //   element: <PersonalInfo />,
        // },
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
  ];

  const commonRoutes = [
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
      ],
    },
  ];

  return createBrowserRouter([
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
        ...(role === 'admin' ? adminRoutes : []),
        ...commonRoutes,
      ],
    },
  ]);
};

export default createRouter;
