import i18next from 'i18next';

import en from './i18n/en';
import tr from './i18n/tr';
import ar from './i18n/ar';
import Programs from './Programs';
import Sessions from './Sessions';
import { baseUrl } from '../../../constants/config';



i18next.addResourceBundle('en', 'examplePage', en);
i18next.addResourceBundle('tr', 'examplePage', tr);
i18next.addResourceBundle('ar', 'examplePage', ar);

const ProgramsConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  routes: [

    {
      path: baseUrl + 'programs/:id',
      element: <Sessions />,
    },


    {
      path: baseUrl + 'programs',
      element: <Programs />,
    },
  ],
};

export default ProgramsConfig;