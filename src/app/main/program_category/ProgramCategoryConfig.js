import ProgramCategory from './ProgramCategory';
import { baseUrl } from '../../../constants/config';
import authRoles from '../../auth/authRoles';

const ProgramCategoryConfig = {
  settings: {
    layout: {
      config: {},
    },
    
  },
  auth: authRoles.admin,
  routes: [
    {
      path: baseUrl + 'program_category',
      element: <ProgramCategory />,
    }
  ],
};

export default ProgramCategoryConfig;