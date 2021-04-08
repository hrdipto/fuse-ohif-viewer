// import { configureStore } from '@reduxjs/toolkit';
// import createReducer from './rootReducer';

// if (process.env.NODE_ENV === 'development' && module.hot) {
// 	module.hot.accept('./rootReducer', () => {
// 		const newRootReducer = require('./rootReducer').default;
// 		store.replaceReducer(newRootReducer.createReducer());
// 	});
// }

// const middlewares = [];

// if (process.env.NODE_ENV === 'development') {
// 	const { logger } = require(`redux-logger`);

// 	middlewares.push(logger);
// }

// const store = configureStore({
// 	reducer: createReducer(),
// 	middleware: getDefaultMiddleware =>
// 		getDefaultMiddleware({
// 			immutableCheck: false,
// 			serializableCheck: {
// 				ignoredActions: [
// 					'dialog/openDialog',
// 					'dialog/closeDialog',
// 					'message/showMessage',
// 					'message/hideMessage'
// 				]
// 			}
// 		}).concat(middlewares),
// 	devTools: process.env.NODE_ENV === 'development'
// });

// store.asyncReducers = {};

// export const injectReducer = (key, reducer) => {
// 	if (store.asyncReducers[key]) {
// 		return false;
// 	}
// 	store.asyncReducers[key] = reducer;
// 	store.replaceReducer(createReducer(store.asyncReducers));
// 	return store;
// };

// export default store;
import { configureStore, createStore, applyMiddleware, compose } from '@reduxjs/toolkit';
import createReducer from './rootReducer';
// import {
// 	applyMiddleware,
// 	combineReducers,
// 	createStore,
// 	compose,
// } from 'redux/es/redux.js';
// import { reducer as oidcReducer } from 'redux-oidc';
import { redux } from '@ohif/core';
import thunkMiddleware from 'redux-thunk';

// Combine our @ohif/core and oidc reducers
// Set init data, using values found in localStorage
const { reducers, localStorage, sessionStorage } = redux;
const middleware = [thunkMiddleware];
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  
//   reducers.oidc = oidcReducer;
  
//   const rootReducer = combineReducers(reducers);
const preloadedState = {
...localStorage.loadState(),
...sessionStorage.loadState(),
};
if (process.env.NODE_ENV === 'development' && module.hot) {
	module.hot.accept('./rootReducer', () => {
		const newRootReducer = require('./rootReducer').default;
		store.replaceReducer(newRootReducer.createReducer());
	});
}

// const middlewares = [];

// if (process.env.NODE_ENV === 'development') {
// 	const { logger } = require(`redux-logger`);

// 	middlewares.push(logger);
// }
const store = createStore(
	createReducer(),
	preloadedState,
	composeEnhancers(applyMiddleware(...middleware))
  );
  store.subscribe(() => {
	localStorage.saveState({
	  preferences: store.getState().preferences,
	});
	sessionStorage.saveState({
	  servers: store.getState().servers,
	});
  });
// const store = configureStore({
// 	reducer: createReducer(),
// 	middleware: getDefaultMiddleware =>
// 		getDefaultMiddleware({
// 			immutableCheck: false,
// 			serializableCheck: {
// 				ignoredActions: [
// 					'dialog/openDialog',
// 					'dialog/closeDialog',
// 					'message/showMessage',
// 					'message/hideMessage'
// 				]
// 			}
// 		}).concat(middleware),
// 	devTools: process.env.NODE_ENV === 'development'
// });


store.asyncReducers = {};

export const injectReducer = (key, reducer) => {
	if (store.asyncReducers[key]) {
		return false;
	}
	store.asyncReducers[key] = reducer;
	store.replaceReducer(createReducer(store.asyncReducers));
	return store;
};

export default store;
