import OHIF from '@ohif/core';
import ViewerMain from './ViewerMain';
import { connect } from 'react-redux';

const { setViewportSpecificData, clearViewportSpecificData } = OHIF.redux.actions;

const mapStateToProps = state => {
	const { activeViewportIndex, layout, viewportSpecificData } = state['rootReducer'].viewports;

	return {
		activeViewportIndex,
		layout,
		viewportSpecificData,
		viewports: state['rootReducer'].viewports
	};
};

const mapDispatchToProps = dispatch => {
	return {
		setViewportSpecificData: (viewportIndex, data) => {
			dispatch(setViewportSpecificData(viewportIndex, data));
		},
		clearViewportSpecificData: () => {
			dispatch(clearViewportSpecificData());
		}
	};
};

const ConnectedViewerMain = connect(mapStateToProps, mapDispatchToProps)(ViewerMain);

export default ConnectedViewerMain;
