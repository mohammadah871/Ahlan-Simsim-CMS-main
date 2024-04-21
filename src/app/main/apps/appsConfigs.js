import TasksAppConfig from './tasks/TasksAppConfig';
import UserAppConfig from './users/usersConfig';
import SpecialtyConfig from './specialty/specialtyConfig';
import SpecialistsConfig from './specialists/specialistConfig';
import SubjectConfig from './subjects/subjectConfig';
import PreviewConfig from './Preview/PreviewConfig';
import FileManagerAppConfig from './file-manager/FileManagerAppConfig';
import SettingsConfig from './settings/SettingsConfig';
import ArticleConfig from './articles/articleConfig';
import taskAppConfig from './tasksapp/taskAppConfig';
import desktopusers from './desktopusers/desktopUsersConfig';
import dashboard from './dashboard/dashboardConfig';

const appsConfigs = [
  TasksAppConfig,
  UserAppConfig,
  SpecialtyConfig,
  SpecialistsConfig,
  SubjectConfig,
  PreviewConfig,
  FileManagerAppConfig,
  SettingsConfig,
  ArticleConfig,
  taskAppConfig,
  desktopusers,
  dashboard
];
export default appsConfigs;