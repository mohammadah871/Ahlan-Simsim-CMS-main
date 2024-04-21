import { lazy } from 'react';
import { baseUrl } from 'src/constants/config';
import authRoles from '../../../auth/authRoles';

const FileManagerApp = lazy(() => import('./FileManagerApp'));

const FileManagerAppConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  auth: authRoles.admin,
  routes: [
    {
      path:baseUrl +  'apps/file-manager',
      element: <FileManagerApp />,
    },
    {
      path:baseUrl +  'apps/file-manager/:folderId',
      element: <FileManagerApp />,
    },
  ],
};

export default FileManagerAppConfig;
