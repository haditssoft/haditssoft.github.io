import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, withTheme } from '@material-ui/core/styles';
import Popper from '@material-ui/core/Popper';
import Fade from '@material-ui/core/Fade';
import Paper from '@material-ui/core/Paper';

import { connect } from 'react-redux';
import KeyboardButton from './KeyboardButton';
import * as actionTypes from '../../store/action';

const styles = theme => ({
  zIdx: {
    zIndex: 1100,
    marginTop: 16,
  },
});

class SimplePopper extends React.Component {
  state = {
    shift: false
  };

  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.theme.palette.type !== nextProps.theme.palette.type) {
      return true;
    }
    if (nextProps.openKeyboard !== this.props.openKeyboard) return true;
    if (nextState.shift !== this.state.shift) return true;
    return false;
  };

  handleClick = (event) => {
    let theValue = event.currentTarget.textContent;

    if (theValue === 'Shift') {
      this.setState(prevState => {
        return {shift: !prevState.shift};
      });
      return;
    };

    const { searchValue, selectionStartIndex, selectionEndIndex } = this.props;

    if (theValue !== 'Delete') {
      if (theValue === 'Space') theValue = ' ';
      // get text from index 0 to selectionStart
      // concatenate it with the new added char
      // get text from index selectionEnd to the end
      // concatenate it with the concatenated text before
      theValue = searchValue.slice(0, selectionStartIndex) + theValue + searchValue.slice(selectionEndIndex);
      this.props.onSearchValueChanged(theValue); // this code is a must in each division
      // every time adding new char, add selectionIndex as well by 1
      // so that adding the next char will be put in front of the char added before it
      this.props.onSelectionIdxChanged(selectionStartIndex + 1, selectionEndIndex + 1);
    } else if (theValue === 'Delete') {
      if (selectionStartIndex !== selectionEndIndex) {
        theValue = searchValue.slice(0, selectionStartIndex) + searchValue.slice(selectionEndIndex);
        this.props.onSearchValueChanged(theValue); // this code is a must in each division
        this.props.onSelectionIdxChanged(selectionStartIndex, selectionStartIndex);
      } else {
        theValue = searchValue.slice(0, selectionStartIndex ? selectionStartIndex - 1 : 0) + searchValue.slice(selectionEndIndex);
        this.props.onSearchValueChanged(theValue); // this code is a must in each division
        this.props.onSelectionIdxChanged(selectionStartIndex ? selectionStartIndex - 1 : 0, selectionEndIndex ? selectionEndIndex - 1 : 0);
      };
    };
  };

  render() {
    const { classes } = this.props;
    const { anchorEl, openKeyboard } = this.props;
    const id = openKeyboard ? 'simple-popper' : null;

    return (
      <div>
        <Popper
          className={classes.zIdx} id={id}
          open={openKeyboard}
          anchorEl={anchorEl}
          placement={'bottom-start'}
          transition>
          {({ TransitionProps }) => (
            <Fade {...TransitionProps} timeout={350}>
              <Paper elevation={24}>
                <KeyboardButton clicked={this.handleClick} shifted={this.state.shift} />
              </Paper>
            </Fade>
          )}
        </Popper>
      </div>
    );
  };
};

SimplePopper.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => {
    return {
        anchorEl: state.arabicKeyboard.anchorEl,
        openKeyboard: state.arabicKeyboard.openKeyboard,
        searchValue: state.inputValue.searchValue,
        selectionStartIndex: state.selectionIndex.selectionStartIndex,
        selectionEndIndex: state.selectionIndex.selectionEndIndex
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onSearchValueChanged: (txt) => dispatch({ type: actionTypes.SEARCHVALUE, value: txt }),
        onSelectionIdxChanged: (start, end) => dispatch({
          type: actionTypes.SELECTIONINDEX,
          startValue: start,
          endValue: end })
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(withTheme(SimplePopper)));
