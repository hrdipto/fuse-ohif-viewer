// import { LayoutButton } from './ui/src/components/layoutButton';
import OHIF from '@ohif/core';
import { connect } from 'react-redux';
import { LayoutButton } from './ui/src/components/layoutButton';
const { setLayout, setViewportActive } = OHIF.redux.actions;

const mapStateToProps = state => {
  return {
    currentLayout: state['rootReducer'].viewports.layout,
    activeViewportIndex: state['rootReducer'].viewports.activeViewportIndex,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    // TODO: Change if layout switched becomes more complex
    onChange: (selectedCell, currentLayout, activeViewportIndex) => {
      const viewports = [];

      // const numRows = selectedCell.row + 1;
      // const numColumns = selectedCell.col + 1;

      // Replacing above two lines by these, 
      const numRows =  1;
      const numColumns =  1;

      const numViewports = numRows * numColumns;

      for (let i = 0; i < numViewports; i++) {
        // Hacky way to allow users to exit MPR "mode"
        const viewport = currentLayout.viewports[i];
        let plugin = viewport && viewport.plugin;
        if (viewport && viewport.vtk) {
          plugin = 'cornerstone';
        }

        viewports.push({
          plugin,
        });
      }
      const layout = {
        numRows,
        numColumns,
        viewports,
      };

      const maxActiveIndex = numViewports - 1;
      if (activeViewportIndex > maxActiveIndex) {
        dispatch(setViewportActive(0));
      }

      dispatch(setLayout(layout));
    },
  };
};

const mergeProps = (propsFromState, propsFromDispatch) => {
  const onChangeFromDispatch = propsFromDispatch.onChange;
  const { currentLayout, activeViewportIndex } = propsFromState;

  return {
    onChange: selectedCell =>
      onChangeFromDispatch(selectedCell, currentLayout, activeViewportIndex),
  };
};

const ConnectedLayoutButton = connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(LayoutButton);

export default ConnectedLayoutButton;
