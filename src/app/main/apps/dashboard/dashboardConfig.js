import { lazy } from 'react';
import { baseUrl } from './../../../../constants/config';
import authRoles from '../../../auth/authRoles';

const DashboardPage = lazy(() => import('./dashboardPage'));
// const Order = lazy(() => import('./order/Order'));
// const Orders = lazy(() => import('./orders/Orders'));

const ECommerceAppConfig = {
    settings: {
        layout: {},
    },
    auth: authRoles.viewer,
    routes: [
        {
            path: baseUrl + 'dashboard',
            element: <DashboardPage />,
        }
        // {
        //   path: 'appusers/orders',
        //   element: <Orders />,
        // }
        // {
        //   path: 'apps/e-commerce/orders/:orderId',
        //   element: <Order />,
        // },
        // {
        //   path: 'apps/e-commerce',
        //   element: <Navigate to="products" />,
        // },
    ],
};

export default ECommerceAppConfig;
