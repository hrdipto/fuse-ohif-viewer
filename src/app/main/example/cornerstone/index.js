import React from 'react';
import init from './init.js';
import commandsModule from './commandsModule.js';
import toolbarModule from './toolbarModule.js';
import CornerstoneViewportDownloadForm from './CornerstoneViewportDownloadForm';
const Component = React.lazy(() => {
	return import('./OHIFCornerstoneViewport');
});

const OHIFCornerstoneViewport = props => {
	return (
		<React.Suspense fallback={<div>Loading...</div>}>
			<Component {...props} />
		</React.Suspense>
	);
};

/**
 *
 */
export default {
	/**
	 * Only required property. Should be a unique value across all extensions.
	 */
	id: 'cornerstone',
	version: '2.1.0',

	/**
	 *
	 *
	 * @param {object} [configuration={}]
	 * @param {object|array} [configuration.csToolsConfig] - Passed directly to `initCornerstoneTools`
	 */
	preRegistration({ servicesManager, configuration = {} }) {
		init({ servicesManager, configuration });
	},

	runCommand: (commandName, options = {}, contextName) => {
		const definition = this.getCommand(commandName, contextName);
		if (!definition) {
			return;
		}
		return definition;
	},
	ExtendedOHIFCornerstoneViewport: props => {
		// return <OHIFCornerstoneViewport {...props} onNewImage={onNewImageHandler} />;
		return <OHIFCornerstoneViewport {...props} />;
	},
	// getViewportModule() {

	//   return ExtendedOHIFCornerstoneViewport;
	// },
	getToolbarModule() {
		return toolbarModule;
	},
	getCommandsModule({ servicesManager }) {
		return commandsModule({ servicesManager });
	}
};

export { CornerstoneViewportDownloadForm };
