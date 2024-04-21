import ResetPassword from './../reset-password/ResetPassword';
import SignInPage from './SignInPage';
import authRoles from '../../auth/authRoles';

const SignInConfig = {
  settings: {
    layout: {
      config: {
        navbar: {
          display: false,
        },
        toolbar: {
          display: false,
        },
        footer: {
          display: false,
        },
        leftSidePanel: {
          display: false,
        },
        rightSidePanel: {
          display: false,
        },
      },
    },
  },
  auth: authRoles.onlyGuest,
  routes: [
    {
      path: process.env.PUBLIC_URL + '/sign-in',
      element: <SignInPage />,
    },
    {
      path: process.env.PUBLIC_URL + '/resetpassword',
      element: <ResetPassword />,
    }
  ],
};

export default SignInConfig;
