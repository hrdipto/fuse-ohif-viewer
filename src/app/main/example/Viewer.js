import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import classNames from 'classnames';
import classNames from 'classnames';

import OHIF, { MODULE_TYPES, DICOMSR } from '@ohif/core';
// import { withDialog } from '@ohif/ui';
import ConnectedViewerMain from './connectedComponents/ConnectedViewerMain.js';
// import ErrorBoundaryDialog from './components/ErrorBoundaryDialog';
import ToolbarRow from './ToolbarRow.js';
// import ToolbarRow from './connectedComponents/ToolbarRow.js';
// import ErrorBoundaryDialog from './../components/ErrorBoundaryDialog';
import { extensionManager } from '../../App.js';

// Contexts
// import WhiteLabelingContext from '../context/WhiteLabelingContext.js';
// import UserManagerContext from '../context/UserManagerContext';
// import AppContext from '../context/AppContext';

import './Viewer.css';
// import { finished } from 'stream';

class Viewer extends Component {
	static propTypes = {
		studies: PropTypes.arrayOf(
			PropTypes.shape({
				StudyInstanceUID: PropTypes.string.isRequired,
				StudyDate: PropTypes.string,
				PatientID: PropTypes.string,
				displaySets: PropTypes.arrayOf(
					PropTypes.shape({
						displaySetInstanceUID: PropTypes.string.isRequired,
						SeriesDescription: PropTypes.string,
						SeriesNumber: PropTypes.number,
						InstanceNumber: PropTypes.number,
						numImageFrames: PropTypes.number,
						Modality: PropTypes.string.isRequired,
						images: PropTypes.arrayOf(
							PropTypes.shape({
								getImageId: PropTypes.func.isRequired
							})
						)
					})
				)
			})
		),
		studyInstanceUIDs: PropTypes.array,
		activeServer: PropTypes.shape({
			type: PropTypes.string,
			wadoRoot: PropTypes.string
		}),
		// onTimepointsUpdated: PropTypes.func,
		// onMeasurementsUpdated: PropTypes.func,
		// // window.store.getState().viewports.viewportSpecificData
		viewports: PropTypes.object.isRequired,
		// // window.store.getState().viewports.activeViewportIndex
		activeViewportIndex: PropTypes.number.isRequired,
		isStudyLoaded: PropTypes.bool
		// dialog: PropTypes.object,
	};

	constructor(props) {
		super(props);

		const { activeServer } = this.props;
		const server = Object.assign({}, activeServer);
		const a = window.store.getState();

		// OHIF.measurements.MeasurementApi.setConfiguration({
		//   dataExchange: {
		//     retrieve: DICOMSR.retrieveMeasurements,
		//     store: DICOMSR.storeMeasurements,
		//   },
		//   server,
		// });

		// OHIF.measurements.TimepointApi.setConfiguration({
		//   dataExchange: {
		//     retrieve: this.retrieveTimepoints,
		//     store: this.storeTimepoints,
		//     remove: this.removeTimepoint,
		//     update: this.updateTimepoint,
		//     disassociate: this.disassociateStudy,
		//   },
		// });

		// this._getActiveViewport = this._getActiveViewport.bind(this);
	}

	state = {
		isLeftSidePanelOpen: true,
		isRightSidePanelOpen: false,
		selectedRightSidePanel: '',
		selectedLeftSidePanel: 'studies', // TODO: Don't hardcode this
		thumbnails: [],
		studies: []
	};

	// componentDidUpdate(prevProps) {
	// const { studies, isStudyLoaded } = this.props;

	// if (studies !== prevProps.studies) {
	//   this.setState({
	//     thumbnails: _mapStudiesToThumbnails(studies),
	//   });
	// }
	// if (isStudyLoaded && isStudyLoaded !== prevProps.isStudyLoaded) {
	//   const PatientID = studies[0] && studies[0].PatientID;
	//   const { currentTimepointId } = this;

	//   this.timepointApi.retrieveTimepoints({ PatientID });
	//   this.measurementApi.retrieveMeasurements(PatientID, [currentTimepointId]);
	// }
	// }

	render() {
		let VisiblePanelLeft, VisiblePanelRight;
		const panelExtensions = extensionManager.modules[MODULE_TYPES.PANEL];

		panelExtensions.forEach(panelExt => {
			panelExt.module.components.forEach(comp => {
				if (comp.id === this.state.selectedRightSidePanel) {
					VisiblePanelRight = comp.component;
				} else if (comp.id === this.state.selectedLeftSidePanel) {
					VisiblePanelLeft = comp.component;
				}
			});
		});

		return (
			<>
				<ToolbarRow
					activeViewport={this.props.viewports[this.props.activeViewportIndex]}
					isLeftSidePanelOpen={this.state.isLeftSidePanelOpen}
					isRightSidePanelOpen={this.state.isRightSidePanelOpen}
					selectedLeftSidePanel={this.state.isLeftSidePanelOpen ? this.state.selectedLeftSidePanel : ''}
					selectedRightSidePanel={this.state.isRightSidePanelOpen ? this.state.selectedRightSidePanel : ''}
					handleSidePanelChange={(side, selectedPanel) => {
						const sideClicked = side && side[0].toUpperCase() + side.slice(1);
						const openKey = `is${sideClicked}SidePanelOpen`;
						const selectedKey = `selected${sideClicked}SidePanel`;
						const updatedState = Object.assign({}, this.state);

						const isOpen = updatedState[openKey];
						const prevSelectedPanel = updatedState[selectedKey];
						// RoundedButtonGroup returns `null` if selected button is clicked
						const isSameSelectedPanel = prevSelectedPanel === selectedPanel || selectedPanel === null;

						updatedState[selectedKey] = selectedPanel || prevSelectedPanel;

						const isClosedOrShouldClose = !isOpen || isSameSelectedPanel;
						if (isClosedOrShouldClose) {
							updatedState[openKey] = !updatedState[openKey];
						}

						this.setState(updatedState);
					}}
					// studies={this.state.studies}
				/>
				{/* <div className="FlexboxLayout">
        <SidePanel from="left" isOpen={this.state.isLeftSidePanelOpen}>
              {VisiblePanelLeft ? (
                <VisiblePanelLeft
                  viewports={this.props.viewports}
                  studies={this.props.studies}
                  activeIndex={this.props.activeViewportIndex}
                />
              ) : (
                <ConnectedStudyBrowser
                  studies={this.state.thumbnails}
                  studyMetadata={this.props.studies}
                />
              )}
            </SidePanel>
            </div> */}
				<div className="FlexboxLayout">
					{/* MAIN */}
					<div className={classNames('main-content')}>
						{/* <ErrorBoundaryDialog context="ViewerMain"> */}
						<ConnectedViewerMain studies={this.props.studies} isStudyLoaded={this.props.isStudyLoaded} />
						{/* </ErrorBoundaryDialog> */}
					</div>
				</div>
			</>
		);
	}
}

export default Viewer;

/**
 * What types are these? Why do we have "mapping" dropped in here instead of in
 * a mapping layer?
 *
 * TODO[react]:
 * - Add showStackLoadingProgressBar option
 *
//  */
// const _mapStudiesToThumbnails = function (studies) {
//   return studies.map(study => {
//     const { StudyInstanceUID } = study;

//     const thumbnails = study.displaySets.map(displaySet => {
//       const {
//         displaySetInstanceUID,
//         SeriesDescription,
//         InstanceNumber,
//         numImageFrames,
//         SeriesNumber,
//       } = displaySet;

//       let imageId;
//       let altImageText;

//       if (displaySet.Modality && displaySet.Modality === 'SEG') {
//         // TODO: We want to replace this with a thumbnail showing
//         // the segmentation map on the image, but this is easier
//         // and better than what we have right now.
//         altImageText = 'SEG';
//       } else if (displaySet.images && displaySet.images.length) {
//         const imageIndex = Math.floor(displaySet.images.length / 2);

//         imageId = displaySet.images[imageIndex].getImageId();
//       } else {
//         altImageText = displaySet.Modality ? displaySet.Modality : 'UN';
//       }

//       return {
//         imageId,
//         altImageText,
//         displaySetInstanceUID,
//         SeriesDescription,
//         InstanceNumber,
//         numImageFrames,
//         SeriesNumber,
//       };
//     });

//     return {
//       StudyInstanceUID,
//       thumbnails,
//     };
//   });
// };
