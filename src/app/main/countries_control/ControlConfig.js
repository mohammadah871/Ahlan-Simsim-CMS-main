import Control from './Control';
import { baseUrl } from '../../../constants/config';
import authRoles from '../../auth/authRoles';
const ControlConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  auth: authRoles.admin,
  routes: [
    {
      path: baseUrl + 'countries_control',
      element: <Control />,
    }
  ],
};
export default ControlConfig;