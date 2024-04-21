import { lazy } from 'react';
import { baseUrl } from '../../../../constants/config';

const Terms = lazy(() => import('./Terms'));
const Privacy = lazy(() => import('./Privacy'));
const About = lazy(() => import('./About'));
const ForceUpdate = lazy(() => import('./ForceUpdate'));
import authRoles from '../../../auth/authRoles';

const specialtyConfig = {
    settings: {
        layout: {},
    },
    auth: authRoles.admin,
    routes: [
        {
            path: baseUrl + 'terms-condition',
            element: <Terms />,
        },

        {
            path: baseUrl + 'privacy-policy',
            element: <Privacy />,
        },

        {
            path: baseUrl + 'about',
            element: <About />,
        },
        {
            path: baseUrl + 'force_update',
            element: <ForceUpdate />,
        }
        // {
        //     path: baseUrl + 'specialty/:id/edit',
        //     element: <Edit />
        // },
        // {
        //     path: baseUrl + 'specialty/add',
        //     element: <Add />
        // }
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
