import { lazy } from 'react';
import Edit from './pages/edit';
import Add from './pages/add';
import { baseUrl } from '../../../../constants/config';
import authRoles from '../../../auth/authRoles';

const Products = lazy(() => import('./products/Products'));
// const Order = lazy(() => import('./order/Order'));
// const Orders = lazy(() => import('./orders/Orders'));

const specialtyConfig = {
  settings: {
    layout: {},
  },
  auth: authRoles.admin,
  routes: [
    {
      path: baseUrl + 'specialty/list',
      element: <Products />,
    },
    {
      path: baseUrl + 'specialty/:id/edit',
      element: <Edit />
    },
    {
      path: baseUrl + 'specialty/add',
      element: <Add />
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

export default specialtyConfig;
