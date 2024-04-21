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
      path: baseUrl + 'subjects',
      element: <Products />,
    },
    {
      path: baseUrl + 'subjects/:id/edit',
      element: <Edit />
    },
    {
      path: baseUrl + 'subjects/add',
      element: <Add />
    },
    {
      path: baseUrl + 'message/add',
      element: <AddData />
    }
  ],
};

export default specialtyConfig;
