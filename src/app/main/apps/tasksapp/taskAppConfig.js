import { lazy } from 'react';
import Edit from './pages/edit';
import Add from './pages/add';
import AddData from './pages/addData';
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
      path: baseUrl + 'taskapp',
      element: <Products />,
    },
    {
      path: baseUrl + 'taskapp/:id/edit',
      element: <Edit />
    },
    {
      path: baseUrl + 'taskapp/add',
      element: <Add />
    }
  ],
};

export default specialtyConfig;
