import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, withTheme } from '@material-ui/core/styles';
import Popper from '@material-ui/core/Popper';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';

import { connect } from 'react-redux';
import Resizable from 're-resizable';
import IconsBar from './IconsBar';
import InputField from './InputField';
import AllNotes from './AllNotes';
import { SWITCHNOTEMODE } from '../../store/action';
import { currentSizeId } from '../../store/currentScreenSize';

const styles = theme => ({
  root: {
    backgroundColor: theme.palette.primary.dark
  },
  setTheDisplay: {
    flex: 'auto',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: theme.palette.type === 'dark' ? '#1D1D1D' : theme.palette.background.default
  },
  setZIndex: {
    zIndex: 2
  }
});

let allowSetInitialFormNoteSize = true;
class FormNote extends React.Component {
  state = {
    width: 0,
    height: 0,
    theWidthDirection: 'right',
    growTextField: 'auto'
  };

  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.theme.palette.type !== nextProps.theme.palette.type) {
      return true;
    }
    if (this.props.openNote !== nextProps.openNote) {
      return true;
    } else if (this.state.theWidthDirection !== nextState.theWidthDirection) {
      return true;
    } else if (this.state.width !== nextState.width || this.state.height !== nextState.height) {
      return true;
    } else if (this.state.growTextField !== nextState.growTextField) {
      return true;
    } else if (this.props.noteMode !== nextProps.noteMode) {
      return true;
    }
    return false;
  };

  componentDidUpdate() {
    if (false) {
      // const widthInPixel = (resizeStore.get('formNote.width') / 100) * this.props.anchorNote.clientWidth;
      // const heightInPixel = (resizeStore.get('formNote.height') / 100) * window.innerHeight;
      // if (this.state.width !== widthInPixel || this.state.height !== heightInPixel) {
      //   this.setState({
      //     width: widthInPixel,
      //     height: heightInPixel,
      //   });
      // }
    } else {
      if (allowSetInitialFormNoteSize) {
        allowSetInitialFormNoteSize = false;
        if (this.state.width !== (this.props.anchorNote.clientWidth / 2) || this.state.height !== (window.innerHeight / 4)) {
          this.setState({
            width: currentSizeId === 'xs' ? this.props.anchorNote.clientWidth - 60 : this.props.anchorNote.clientWidth / 2,
            height: window.innerHeight / 4,
          });
        }
      }
    }
    if (!this.props.openNote) {
      this.props.onSwitchNoteMode('create');
    }
  }

  render() {
    const { classes, anchorNote, openNote, noteMode } = this.props;
    const id = openNote ? 'note-popper' : null;

    return (
      <div>
        <Popper
          // popperOptions={{
          //   modifiers: {
          //     computeStyle: { x: 'top' },
          //   }
          // }}
          className={classes.setZIndex}
          id={id}
          open={openNote}
          anchorEl={anchorNote}
          placement={'top'}
          modifiers={{
            // 'top' for growing up instead of down while this.state.theWidthDirection is for left/right
            computeStyle: { x: 'top', y: this.state.theWidthDirection },
          }}
          transition
        >
          {({ TransitionProps }) => (
            <Grow {...TransitionProps} timeout={400}>
              <Resizable
                ref={el => { this.refOfResizable = el; }}
                bounds={anchorNote}
                style={{ display: 'flex' }}
                size={{
                  width: this.state.width,
                  height: this.state.height,
                }}
                onResizeStart={(e, dir) => {
                  switch (dir) {
                    case 'top':
                      // without growTextField logic textarea won't expands its height when top resizing
                      this.setState({ growTextField: '100%' });
                      break;
                    case 'topRight':
                      this.setState({ theWidthDirection: 'right' });
                      this.setState({ growTextField: '100%' });
                      break;
                    case 'topLeft':
                      this.setState({ theWidthDirection: 'left' });
                      this.setState({ growTextField: '100%' });
                      break;
                    default:
                      break;
                  };
                }}
                onResize={(e, dir) => {
                  // might could be done by margin auto
                  if (dir !== 'top') {
                    this.setState(prevState => {
                      return { theWidthDirection: prevState.theWidthDirection === 'right' ? 'left' : 'right' };
                    });
                  }
                }}
                onResizeStop={(e, dir) => {
                  // importan to put this block of code before setState below it
                  // resizeStore.set('formNote',
                  //   {
                  //     width: (this.refOfResizable.resizable.clientWidth / anchorNote.clientWidth) * 100,
                  //     height: (this.refOfResizable.resizable.clientHeight / window.innerHeight) * 100
                  //   }
                  // );
                  this.setState({
                    width: this.refOfResizable.resizable.clientWidth,
                    height: this.refOfResizable.resizable.clientHeight,
                    growTextField: 'auto'
                  });
                }}
                enable={{
                  top: true,
                  right: true,
                  bottom: false,
                  left: true,
                  topRight: true,
                  bottomRight: false,
                  bottomLeft: false,
                  topLeft: true
                }}
              >
                <Paper elevation={24} classes={{ root: classes.setTheDisplay }}>
                  <IconsBar />
                  {noteMode === 'create' ? <InputField growTextField={this.state.growTextField} /> : <AllNotes />}
                </Paper>
              </Resizable>
            </Grow>
          )}
        </Popper>
      </div>
    );
  };
};

FormNote.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => {
  return {
    anchorNote: state.showNote.anchorNote,
    openNote: state.showNote.openNote,
    noteMode: state.switchNoteMode.noteMode,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onSwitchNoteMode: (str) => dispatch({ type: SWITCHNOTEMODE, mode: str }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(withTheme(FormNote)));