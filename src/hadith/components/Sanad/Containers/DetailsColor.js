import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, withTheme } from '@material-ui/core/styles';
import Popper from '@material-ui/core/Popper';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';

import { connect } from 'react-redux';
import ColorComponent from '../Components/ColorComponent';


const styles = theme => ({
  setTheDisplay: {
    flex: 'auto',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: theme.palette.type === 'dark' ? '#151515' : theme.palette.background.paper,
    width: 300,
    padding: '0px 16px 8px',
  },
  marginAndZIndex: {
    zIndex: 1100,
    marginTop: '-60px',
    marginRight: 9,
  },
});

class DetailsColor extends React.Component {

  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.theme.palette.type !== nextProps.theme.palette.type) {
      return true;
    }
    if (this.props.openDetailsColor !== nextProps.openDetailsColor) {
      return true;
    } else if (this.props.anchorDetailsColor !== nextProps.anchorDetailsColor) {
      return true;
    };
    return false;
  };

  render() {
    const { classes, anchorDetailsColor, openDetailsColor, narrators, sanadPos } = this.props;
    const id = openDetailsColor ? 'details-color-popper' : null;

    return (
      <div>
        <Popper
          className={classes.marginAndZIndex}
          id={id}
          open={openDetailsColor}
          anchorEl={anchorDetailsColor}
          placement='left-start'
          transition>
          {({ TransitionProps }) => (
            <Grow {...TransitionProps} timeout={400}>
              <Paper elevation={4} square classes={{ root: classes.setTheDisplay }}>
                <ColorComponent
                  narrator={narrators}
                  sanadPosition={sanadPos}
                />
              </Paper>
            </Grow>
          )}
        </Popper>
      </div>
    );
  };
};

DetailsColor.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => {
  return {
    anchorDetailsColor: state.showDetailsColor.anchorDetailsColor,
    openDetailsColor: state.showDetailsColor.openDetailsColor,
    narrators: state.sanadData.narrators,
    sanadPos: state.sanadPosition.sanadPos,
  };
};

export default connect(mapStateToProps)(withStyles(styles)(withTheme(DetailsColor)));
