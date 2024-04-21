import { lazy } from 'react';
import Edit from './pages/edit';
import { baseUrl } from './../../../../constants/config';
import authRoles from '../../../auth/authRoles';

const Products = lazy(() => import('./products/Products'));
// const Order = lazy(() => import('./order/Order'));
// const Orders = lazy(() => import('./orders/Orders'));

const ECommerceAppConfig = {
  settings: {
    layout: {},
  },
  auth: authRoles.admin,
  routes: [
    {
      path: baseUrl + 'desktop_accounts',
      element: <Products />,
    },
    {
      path: baseUrl + 'desktop_accounts/:id/edit',
      element: <Edit />
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
