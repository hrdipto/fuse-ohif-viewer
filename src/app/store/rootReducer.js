import { combineReducers } from '@reduxjs/toolkit';
import auth from 'app/auth/store';
import fuse from './fuse';
import i18n from './i18nSlice';
import { reducer as oidcReducer } from 'redux-oidc';
import { redux } from '@ohif/core';
const { reducers, localStorage, sessionStorage } = redux;

reducers.oidc = oidcReducer;

const rootReducer = combineReducers(
	reducers
);
const createReducer = asyncReducers =>
	combineReducers({
		rootReducer,
		auth,
		fuse,
		i18n,
		...asyncReducers
	});

export default createReducer;
