import React from 'react';
import { withStyles, withTheme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

import { NOTEVALUE } from '../../store/action';
import { connect } from 'react-redux';

const styles = theme => ({
  rootTextField: {
    flex: 'auto',
    // backgroundColor: theme.palette.type === 'dark' ? '#1D1D1D' : null
  },
  theInputRoot: {
    flex: 'auto'
  },
  textAreaStyle: props => ({
    // without props.growTextField logic textarea won't expands its height when top resizing
    height: props.growTextField,
    padding: (props.growTextField === 'auto') ? '8px 24px 30px' : '0 24px',
    textAlign: 'justify',
    fontFamily: `${props.indoFont[0]}, ${props.indoFont[1]}`,
    fontWeight: props.indoFont[2],
    fontSize: props.indoFont[3],
    lineHeight: theme.typography.subtitle1.lineHeight,
    letterSpacing: theme.typography.caption.letterSpacing,
    alignSelf: (props.growTextField === 'auto') ? 'normal' : 'unset',
    overflowX: 'hidden',
    overflowY: 'overlay'
  })
});

class InputField extends React.Component {

  shouldComponentUpdate(nextProps) {
    if (this.props.theme.palette.type !== nextProps.theme.palette.type) {
      return true;
    }
    if (this.props.noteValue !== nextProps.noteValue) {
      return true;
    } else if (this.props.indoFont[0] !== nextProps.indoFont[0] ||
      this.props.indoFont[2] !== nextProps.indoFont[2] ||
      this.props.indoFont[3] !== nextProps.indoFont[3]) {
      if (this.props.openNote === true) {
        return true;
      }
    }
    return false;
  };

  handleChanged = (event) => {
    this.props.onStoreNoteValue(event.target.value);
  };

  render() {
    const { classes, noteValue } = this.props;
    return (
      <TextField
        classes={{ root: classes.rootTextField }}
        value={noteValue}
        onChange={this.handleChanged}
        InputProps={{ classes: { root: classes.theInputRoot } }}
        inputProps={{ className: classes.textAreaStyle }}
        rows="1"
        multiline
        autoFocus={noteValue ? false : true}
        fullWidth
      />
    );
  };
};

const mapStateToProps = state => {
  return {
    noteValue: state.showNote.noteValue,
    indoFont: state.fontSetting.indoFont
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onStoreNoteValue: (str) => dispatch({ type: NOTEVALUE, value: str })
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(withTheme(InputField)));