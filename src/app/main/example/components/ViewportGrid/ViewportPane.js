import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './ViewportPane.css';

const ViewportPane = function (props) {
	const { children, viewportIndex, className: propClassName } = props;
	// const [{ hovered, highlighted }, drop] = useDrop({
	//   accept: 'thumbnail',
	//   drop: (droppedItem, monitor) => {
	//     const canDrop = monitor.canDrop();
	//     const isOver = monitor.isOver();

	//     if (canDrop && isOver && onDrop) {
	//       const { StudyInstanceUID, displaySetInstanceUID } = droppedItem;

	//       onDrop({ viewportIndex, StudyInstanceUID, displaySetInstanceUID });
	//     }
	//   },
	//   // Monitor, and collect props.
	//   // Returned as values by `useDrop`
	//   collect: monitor => ({
	//     highlighted: monitor.canDrop(),
	//     hovered: monitor.isOver(),
	//   }),
	// });

	return (
		// <div
		//   className={classNames(
		//     'viewport-drop-target',
		//     { hovered: hovered },
		//     { highlighted: highlighted },
		//     propClassName
		//   )}
		//   ref={drop}
		//   data-cy={`viewport-container-${viewportIndex}`}
		// >
		//   {children}
		// </div>
		<div
			className={classNames('viewport-drop-target', propClassName)}
			data-cy={`viewport-container-${viewportIndex}`}
		>
			{children}
		</div>
	);
};

ViewportPane.propTypes = {
	children: PropTypes.node.isRequired,
	viewportIndex: PropTypes.number.isRequired,
	className: PropTypes.string
};

export default ViewportPane;
