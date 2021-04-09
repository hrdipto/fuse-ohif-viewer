import i18next from 'i18next';
import Example from './Example';
import en from './i18n/en';
import tr from './i18n/tr';
import ar from './i18n/ar';
import ViewerRouting from './ViewerRouting';

// const ViewerRouting = asyncComponent(() =>
// 	retryImport(() => import(/* webpackChunkName: "ViewerRouting" */ './ViewerRouting.js'))
// );

i18next.addResourceBundle('en', 'examplePage', en);
i18next.addResourceBundle('tr', 'examplePage', tr);
i18next.addResourceBundle('ar', 'examplePage', ar);

const ExampleConfig = {
	settings: {
		layout: {
			config: {}
		}
	},
	routes: [
		{
			path: '/report/:studyInstanceUIDs',
			component: ViewerRouting
		}
	]
};

export default ExampleConfig;

/**
 * Lazy load Example
 */
/*
import React from 'react';

const ExampleConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    routes  : [
        {
            path     : '/example',
            component: React.lazy(() => import('./Example'))
        }
    ]
};

export default ExampleConfig;

*/
