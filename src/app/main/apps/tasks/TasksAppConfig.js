import { lazy } from 'react';
import TaskForm from './task/TaskForm';
import { baseUrl } from '../../../../constants/config';

const TasksApp = lazy(() => import('./TasksApp'));

const TasksAppConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  routes: [
    {
      path: baseUrl + 'engines/:programId/:sessionId/',
      element: <TasksApp />,
      children: [
        {
          path: ':id',
          element: <TaskForm />,
        },
        {
          path: ':id/:type',
          element: <TaskForm />,
        },
      ],
    },
  ],
};

export default TasksAppConfig;