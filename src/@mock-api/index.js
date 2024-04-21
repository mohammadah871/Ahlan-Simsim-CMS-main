import './api/auth-api';
import './api/notifications-api';
import history from '@history';
import mock from './mock';

mock.onAny().passThrough();

if (module?.hot?.status() === 'apply') {
  const { pathname } = history.location;
  history.push(process.env.PUBLIC_URL + '/loading');
  history.push({ pathname });
}
