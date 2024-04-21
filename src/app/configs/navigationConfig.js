import i18next from 'i18next';
import ar from './navigation-i18n/ar';
import en from './navigation-i18n/en';
import tr from './navigation-i18n/tr';
import authRoles from '../auth/authRoles';
i18next.addResourceBundle('en', 'navigation', en);
i18next.addResourceBundle('tr', 'navigation', tr);
i18next.addResourceBundle('ar', 'navigation', ar);

const navigationConfig = [


  {
    id: 'dashboard-data',
    title: 'Dashboard',
    translate: 'Dashboard',
    type: 'item',
    icon: 'heroicons-outline:star',
    url: process.env.PUBLIC_URL + '/dashboard',
    auth: authRoles.viewer,
  },
  {
    id: 'content-control',
    title: 'Content Control',
    type: 'collapse',
    url: process.env.PUBLIC_URL + '/program_category',
    auth: authRoles.admin,
    icon: 'material-solid:play_lesson',
    children: [
      {
        id: 'example-component',
        title: 'Programs',
        translate: 'Programs',
        type: 'item',
        icon: 'heroicons-outline:star',
        url: process.env.PUBLIC_URL + '/programs',
      },
      {
        id: 'example-component-1',
        title: 'File Manager',
        type: 'item',
        icon: 'heroicons-outline:star',
        url: process.env.PUBLIC_URL + '/apps/file-manager',
        auth: authRoles.admin,
      },
      {
        id: 'program_category2',
        title: 'Program Categories',
        type: 'item',
        icon: 'heroicons-outline:star',
        url: process.env.PUBLIC_URL + '/program_category',
        auth: authRoles.admin,
      },
      {
        id: 'countries_control',
        title: 'Countries',
        type: 'item',
        icon: 'heroicons-outline:check-circle',
        url: process.env.PUBLIC_URL + '/countries_control',
        auth: authRoles.admin,
      }
    ]
  },
  {
    id: "desktop-app",
    title: 'Desktop/ App',
    type: 'collapse',
    url: process.env.PUBLIC_URL + '/desktop_accounts',
    auth: authRoles.admin,
    icon: 'material-solid:play_lesson',
    children: [

      {
        id: 'desktop_users',
        title: 'Users',
        type: 'item',
        icon: 'heroicons-outline:check-circle',
        url: process.env.PUBLIC_URL + '/desktop_accounts',
        auth: authRoles.admin,
      },

      {
        id: 'events',
        title: 'Events',
        type: 'item',
        icon: 'heroicons-outline:check-circle',
        url: process.env.PUBLIC_URL + '/taskapp',
        auth: authRoles.admin,
      }

    ]
  },
  {
    id: "caregivers-users",
    title: "Caregivers App",
    type: 'collapse',
    url: process.env.PUBLIC_URL + '/familyaccounts',
    auth: authRoles.admin,
    icon: 'material-solid:play_lesson',
    children: [
      {
        id: 'apps.users',
        title: 'Family accounts',
        type: 'item',
        icon: 'heroicons-outline:check-circle',
        url: process.env.PUBLIC_URL + '/familyaccounts',
        auth: authRoles.admin,
      },

      {
        id: 'apps.specialists',
        title: 'Specialist Accounts',
        type: 'item',
        icon: 'heroicons-outline:check-circle',
        url: process.env.PUBLIC_URL + '/specialists',
        auth: authRoles.admin,
      },
      {
        id: 'apps.speciality',
        title: 'Specialties',
        type: 'item',
        icon: 'heroicons-outline:check-circle',
        url: process.env.PUBLIC_URL + '/specialty/list',
        auth: authRoles.admin,
      },
      {
        id: 'apps.subjects',
        title: 'Subjects',
        type: 'item',
        icon: 'heroicons-outline:check-circle',
        url: process.env.PUBLIC_URL + '/subjects',
        translate: 'Subjects',
        auth: authRoles.admin,
      },


      {
        id: 'articles',
        title: 'Articles',
        type: 'item',
        icon: 'heroicons-outline:check-circle',
        url: process.env.PUBLIC_URL + '/articles',
        auth: authRoles.admin,
      }

    ]
  },
  {
    id: 'static-pages',
    title: 'Static pages',
    type: 'collapse',
    url: process.env.PUBLIC_URL + '/privacy-policy',
    auth: authRoles.admin,
    icon: 'material-solid:play_lesson',
    children: [

      {
        id: 'apps.privacy-policy',
        title: 'Privacy Policy',
        type: 'item',
        icon: 'heroicons-outline:check-circle',
        url: process.env.PUBLIC_URL + '/privacy-policy',
        auth: authRoles.admin,
      },
      {
        id: 'apps.terms',
        title: 'Terms and Conditions',
        type: 'item',
        icon: 'heroicons-outline:check-circle',
        url: process.env.PUBLIC_URL + '/terms-condition',
        auth: authRoles.admin,
      },
      {
        id: 'apps.about',
        title: 'About Us',
        type: 'item',
        icon: 'heroicons-outline:check-circle',
        url: process.env.PUBLIC_URL + '/about',
        auth: authRoles.admin,
      },
      {
        id: 'apps.force_update',
        title: 'Force update',
        type: 'item',
        icon: 'heroicons-outline:check-circle',
        url: process.env.PUBLIC_URL + '/force_update',
        auth: authRoles.admin,
      }
    ]
  },




];

export default navigationConfig;