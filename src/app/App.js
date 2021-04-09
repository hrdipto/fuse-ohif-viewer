import MomentUtils from '@date-io/moment';
import FuseAuthorization from '@fuse/core/FuseAuthorization';
import FuseLayout from '@fuse/core/FuseLayout';
import FuseTheme from '@fuse/core/FuseTheme';
import history from '@history';
import { createGenerateClassName, jssPreset, StylesProvider } from '@material-ui/core/styles';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import { create } from 'jss';
import jssExtend from 'jss-plugin-extend';
import rtl from 'jss-rtl';
import React from 'react';
import Provider from 'react-redux/es/components/Provider';
import { Router } from 'react-router-dom';
import AppContext from './AppContext';
import { Auth } from './auth';
import routes from './fuse-configs/routesConfig';
import store from './store';
import OHIFCornerstoneExtension from './main/example/cornerstone/';

import { getActiveContexts } from './store/layout/selectors.js';

import {
	CommandsManager,
	ExtensionManager,
	utils,
	redux as reduxOHIF,
	ServicesManager,
	HotkeysManager,
	MeasurementService,
	UIDialogService,
	UIModalService,
	UINotificationService
} from '@ohif/core';
import { AppProvider, useAppContext, CONTEXTS } from './main/example/context/AppContext';
import PropTypes from 'prop-types';
import { GenericViewerCommands, MeasurementsPanel } from './main/example/appExtensions';
import ConnectedViewer from './main/example/ConnectedViewer.js';
import { hot } from 'react-hot-loader/root';
import { setConfiguration } from './config';
const commandsManagerConfig = {
	getAppState: () => store.getState(),
	getActiveContexts: () => getActiveContexts(store.getState())
};
/** Managers */
const commandsManager = new CommandsManager(commandsManagerConfig);
let extensionManager;
const servicesManager = new ServicesManager();
// TODO[react] Use a provider when the whole tree is React
const hotkeysManager = new HotkeysManager(commandsManager, servicesManager);

window.store = store;

window.ohif = window.ohif || {};
window.ohif.app = {
	commandsManager,
	extensionManager,
	hotkeysManager,
	servicesManager
};

const jss = create({
	...jssPreset(),
	plugins: [...jssPreset().plugins, jssExtend(), rtl()],
	insertionPoint: document.getElementById('jss-insertion-point')
});

const generateClassName = createGenerateClassName();
// _appConfig;
//   _userManager;
const App = props => {
	const { config, defaultExtensions } = props;

	const appDefaultConfig = {
		showStudyList: true,
		cornerstoneExtensionConfig: {},
		extensions: [],
		routerBasename: '/'
	};

	const _appConfig = {
		...appDefaultConfig,
		...(typeof config === 'function' ? config({ servicesManager }) : config)
	};

	const { servers, hotkeys: appConfigHotkeys, cornerstoneExtensionConfig, extensions, oidc } = _appConfig;

	setConfiguration(_appConfig);

	// this.initUserManager(oidc);
	_initServices([UINotificationService, UIModalService, UIDialogService, MeasurementService]);
	_initExtensions([...defaultExtensions, ...extensions], cornerstoneExtensionConfig, _appConfig);

	/*
	 * Must run after extension commands are registered
	 * if there is no hotkeys from localStorage set up from config.
	 */
	_initHotkeys(appConfigHotkeys);
	_initServers(servers);
	// initWebWorkers();

	return (
		<AppContext.Provider
			value={{
				routes
			}}
		>
			<StylesProvider jss={jss} generateClassName={generateClassName}>
				<Provider store={store}>
					<AppProvider config={_appConfig}>
						<MuiPickersUtilsProvider utils={MomentUtils}>
							<Auth>
								<Router history={history}>
									<FuseAuthorization>
										<FuseTheme>
											<FuseLayout />
										</FuseTheme>
									</FuseAuthorization>
								</Router>
							</Auth>
						</MuiPickersUtilsProvider>
					</AppProvider>
				</Provider>
			</StylesProvider>
		</AppContext.Provider>
	);
};
App.propTypes = {
	config: PropTypes.oneOfType([
		PropTypes.func,
		PropTypes.shape({
			routerBasename: PropTypes.string.isRequired,
			oidc: PropTypes.array,
			whiteLabeling: PropTypes.shape({
				createLogoComponentFn: PropTypes.func
			}),
			extensions: PropTypes.array
		})
	]).isRequired,
	defaultExtensions: PropTypes.array
};

App.defaultProps = {
	config: {
		showStudyList: true,
		oidc: [],
		extensions: []
	},
	defaultExtensions: []
};

// _appConfig;
// _userManager;

function _initServices(services) {
	servicesManager.registerServices(services);
}

/**
 * @param
 */
function _initExtensions(extensions, cornerstoneExtensionConfig, appConfig) {
	extensionManager = new ExtensionManager({
		commandsManager,
		servicesManager,
		appConfig,
		api: {
			contexts: CONTEXTS,
			hooks: {
				useAppContext
			}
		}
	});

	const requiredExtensions = [GenericViewerCommands, [OHIFCornerstoneExtension, cornerstoneExtensionConfig]];
	console.log(requiredExtensions);
	if (appConfig.disableMeasurementPanel !== true) {
		/* WARNING: MUST BE REGISTERED _AFTER_ OHIFCornerstoneExtension */
		requiredExtensions.push(MeasurementsPanel);
	}

	const mergedExtensions = requiredExtensions.concat(extensions);
	extensionManager.registerExtensions(mergedExtensions);
}

/**
 *
 * @param {Object} appConfigHotkeys - Default hotkeys, as defined by app config
 */
function _initHotkeys(appConfigHotkeys) {
	// TODO: Use something more resilient
	// TODO: Mozilla has a special library for this
	const userPreferredHotkeys = JSON.parse(localStorage.getItem('hotkey-definitions') || '{}');

	// TODO: hotkeysManager.isValidDefinitionObject(/* */)
	const hasUserPreferences = userPreferredHotkeys && Object.keys(userPreferredHotkeys).length > 0;
	if (hasUserPreferences) {
		hotkeysManager.setHotkeys(userPreferredHotkeys);
	} else {
		hotkeysManager.setHotkeys(appConfigHotkeys);
	}

	hotkeysManager.setDefaultHotKeys(appConfigHotkeys);
}

function _initServers(servers) {
	if (servers) {
		utils.addServers(servers, store);
	}
}

function _isAbsoluteUrl(url) {
	return url.includes('http://') || url.includes('https://');
}

function _makeAbsoluteIfNecessary(url, base_url) {
	if (_isAbsoluteUrl(url)) {
		return url;
	}

	/*
	 * Make sure base_url and url are not duplicating slashes.
	 */
	if (base_url[base_url.length - 1] === '/') {
		base_url = base_url.slice(0, base_url.length - 1);
	}

	return base_url + url;
}
const ExportedApp = process.env.NODE_ENV === 'development' ? hot(App) : App;
export default App;
export { commandsManager, extensionManager };
