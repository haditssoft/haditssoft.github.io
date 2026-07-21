import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, withTheme } from '@material-ui/core/styles';
import Popper from '@material-ui/core/Popper';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';

import { connect } from 'react-redux';
import Resizable from 're-resizable';
import ProfileComponent from '../Components/ProfileComponent';
import { setDispatchScholarComment } from '../../../sender/senderDataRequest';
import { SCHOLARCOMMENT, ISNARRATORSELECTED } from '../../../store/action';


const styles = theme => {
  let bgColor = theme.palette.grey[100], bdColor = 'blue';
  if (theme.palette.type === 'dark') {
    bgColor = '#1D1D1D';
    bdColor = '#00AEDB';
  }
  return ({
    setTheDisplay: {
      flex: 'auto',
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: bgColor,
      padding: '8px 16px',
      overflowY: 'overlay',
      borderStyle: 'double',
      borderColor: bdColor
    },
    marginAndZIndex: {
      zIndex: 1100,
      marginTop: '-90px',
    },
  })
};

class ProfileRawi extends React.Component {
  state = {
    width: 0, // 830,
    height: 0, // 215,
    theWidthDirection: 'right',
  };

  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.theme.palette.type !== nextProps.theme.palette.type) {
      return true;
    }
    if (this.props.openProfile !== nextProps.openProfile) {
      return true;
    } else if (this.state.theWidthDirection !== nextState.theWidthDirection) {
      return true;
    } else if (this.state.width !== nextState.width || this.state.height !== nextState.height) {
      return true;
    };
    return false;
  };

  componentDidMount() {
    setDispatchScholarComment(this.propsForScholarComment);
  }

  propsForScholarComment = () => {
    return {
      onStoreScholarComment: this.props.onStoreScholarComment
    };
  }

  componentDidUpdate(prevProps) {
    // if (false) {
      // const widthInPixel = (resizeStore.get('profileRawi.width') / 100) * this.props.resizeBound.clientWidth;
      // const heightInPixel = (resizeStore.get('profileRawi.height') / 100) * window.innerHeight;
      // if (this.state.width !== widthInPixel || this.state.height !== heightInPixel) {
      //   this.setState({
      //     width: widthInPixel,
      //     height: heightInPixel,
      //   });
      // }
    // } else 
    if (!this.state.width) {
      if (this.state.width !== (this.props.resizeBound.clientWidth) || this.state.height !== (window.innerHeight / 4)) {
        this.setState({
          width: this.props.resizeBound.clientWidth - 10, // / 2,
          height: window.innerHeight / 2
        });
      }
    }
    // if ProfileRawi to be hidden unselect ListOfRaiwName if RawiSearchTab is currently shown
    if (prevProps.openProfile && !this.props.openProfile) {
      if (this.props.rightTab === 3) {
        this.props.onWhichRawiIsSelected(null);
      }
    }
  }

  render() {
    const { classes, openProfile, tabBodyHeight } = this.props;
    const id = openProfile ? 'profile-popper' : null;

    return (
      <Popper
        // popperOptions={{
        //   modifiers: {
        //     computeStyle: { x: 'top' },
        //   }
        // }}
        className={classes.marginAndZIndex}
        id={id}
        open={openProfile}
        anchorEl={tabBodyHeight}
        placement='left'
        modifiers={{
          // 'top' for growing up instead of down while this.state.theWidthDirection is for left/right
          computeStyle: { x: 'top', y: this.state.theWidthDirection },
          // arrow: {
          //   element: 'arrow-detail-rawi',
          //   enabled: true,
          // },
        }}
        transition>
        {({ TransitionProps }) => (
          <Grow {...TransitionProps} timeout={400}>
            <Resizable
              ref={el => { this.refOfResizable = el; }}
              // bounds={resizeBound}
              style={{display: 'flex'}}
              size={{
                width: this.state.width,
                height: this.state.height,
              }}
              onResizeStart={(e, dir) => {
                switch (dir) {
                  case 'topRight':
                    this.setState({ theWidthDirection: 'right' });
                    break;
                  case 'topLeft':
                    this.setState({ theWidthDirection: 'left' });
                    break;
                  default:
                    break;
                };
              }}
              onResize={(e, dir) => {
                // might could be done by margin auto
                if (dir !== 'top') {
                  this.setState(prevState => {
                    return { theWidthDirection: prevState.theWidthDirection === 'right' ? 'left' : 'right' }
                  });
                };
              }}
              onResizeStop={(e, dir) => {
                // importan to put this block of code before setState below it
                // resizeStore.set('profileRawi',
                //   {
                //     width: (this.refOfResizable.resizable.clientWidth / resizeBound.clientWidth) * 100,
                //     height: (this.refOfResizable.resizable.clientHeight / window.innerHeight) * 100
                //   }
                // );
                this.setState({ 
                  width: this.refOfResizable.resizable.clientWidth,
                  height: this.refOfResizable.resizable.clientHeight,
                });
              }}
              enable={{
                top:true,
                right:false,
                bottom:true,
                left:true,
                topRight:false,
                bottomRight:false,
                bottomLeft:true,
                topLeft:true
              }}
            >
              <Paper elevation={2} square classes={{root: classes.setTheDisplay}}>
                <ProfileComponent />
              </Paper>
            </Resizable>
          </Grow>
        )}
      </Popper>
    );
  };
};

ProfileRawi.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => {
    return {
      tabBodyHeight: state.tabBodyHeightRef.tabBodyHeight.parentElement,
      openProfile: state.showProfile.openProfile,
      resizeBound: state.showProfile.resizeBound,
      rightTab: state.indexTab.rightTab,
    };
};

const mapDispatchToProps = dispatch => {
  return {
    onStoreScholarComment: (arRay) => dispatch({ type: SCHOLARCOMMENT, comment: arRay}),
    onWhichRawiIsSelected: (num) => dispatch({ type: ISNARRATORSELECTED, selected: num }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(withTheme(ProfileRawi)));
