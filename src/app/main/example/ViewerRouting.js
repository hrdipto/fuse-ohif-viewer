import React from 'react';
// import PropTypes from 'prop-types';
// // import { utils, user } from "@ohif/core";
// //
import ConnectedViewerRetrieveStudyData from './connectedComponents/ConnectedViewerRetrieveStudyData';

// const { urlUtil: UrlUtil } = utils;

/**
 * Get array of seriesUIDs from param or from queryString
 * @param {*} seriesInstanceUIDs
 * @param {*} location
 */
// const getSeriesInstanceUIDs = (seriesInstanceUIDs, routeLocation) => {
//   const queryFilters = UrlUtil.queryString.getQueryFilters(routeLocation);
//   const querySeriesUIDs = queryFilters && queryFilters["seriesInstanceUID"];
//   const _seriesInstanceUIDs = seriesInstanceUIDs || querySeriesUIDs;

//   return UrlUtil.paramString.parseParam(_seriesInstanceUIDs);
// };

function ViewerRouting() {
	// Set the user's default authToken for outbound DICOMWeb requests.
	// Is only applied if target server does not set `requestOptions` property.
	//
	// See: `getAuthorizationHeaders.js`
	// let query = useQuery();
	// const authToken = query.get("token");
	// if (authToken) {
	//   user.getAccessToken = () => authToken;
	// }
	//const server = useServer({ project, location, dataset, dicomStore });
	const seriesUIDs = null;

	// if (server) {
	return (
		<ConnectedViewerRetrieveStudyData
			studyInstanceUIDs={['1.2.276.0.7230010.3.1.2.8323329.5801.1517875190.850479']}
			seriesInstanceUIDs={seriesUIDs}
		/>
	);
}

export default ViewerRouting;
