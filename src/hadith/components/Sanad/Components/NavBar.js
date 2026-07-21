import React from "react";
import { withStyles, withTheme } from '@material-ui/core/styles';
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Slide from "@material-ui/core/Slide";
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

import { connect } from 'react-redux';
import { SANADPOSITION } from '../../../store/action';
import DiagramAndColorIcons from './NavBarItem/DiagramAndColor';
import SanadCounter from './NavBarItem/SanadCounter';
import PrevNextSanadIcons from './NavBarItem/PrevNextSanad';

const styles = theme => ({
  root: {
    justifyContent: 'space-between',
  },
  backColor: {
    backgroundColor: theme.palette.type === 'dark' ? '#111111' : null
  },
});

let prevScrollValue = 0;

class HideAppBar extends React.Component {
  state = {
    showAppBar: true
  };

  refer = React.createRef();

  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.theme.palette.type !== nextProps.theme.palette.type) {
      return true;
    }
    if (this.state.showAppBar !== nextState.showAppBar) {
      return true;
    };
    return false;
  };

  componentDidMount() {
    this.refer.current.parentElement.parentElement.addEventListener('scroll', this.handleScroll);
  };

  componentWillUnmount() {
    this.refer.current.parentElement.parentElement.removeEventListener('scroll', this.handleScroll);
  };

  handleScroll = (event) => {
    const sanadScroll = event.target.scrollTop;

    const height = event.target.scrollHeight - event.target.clientHeight;

    const scrolled = sanadScroll / height;

    if (scrolled >= 0.3) {
      if (prevScrollValue - scrolled > 0) { // if plus that means scrollUp
        this.setState({ showAppBar: true });
      } else { // if minus that means scrolldown
        this.setState({ showAppBar: false });
      };
    } else {
      this.setState({ showAppBar: true });
    }
    prevScrollValue = scrolled;
  };

  handlePrevNextSanad = (prevOrNext) => {
    if (this.props.sanadPos + prevOrNext >= 0 && this.props.sanadPos + prevOrNext <= this.props.narrators.length - 1) {
      this.props.onChangeSanadPos(this.props.sanadPos + prevOrNext);
    }
  };

  render() {
    const { classes } = this.props;

    return (
      <React.Fragment>
        <Slide timeout={800} direction="down" in={this.state.showAppBar} ref={this.refer}>
          <AppBar position='sticky' className={classes.backColor}>
            <Toolbar classes={{ root: classes.root }}>
              <DiagramAndColorIcons />
              <SanadCounter />
              <PrevNextSanadIcons
                isDisabled={this.props.firstPrev}
                clicked={() => this.handlePrevNextSanad(-1)}
                icon={<ChevronLeftIcon />}
              />
              <PrevNextSanadIcons
                isDisabled={this.props.lastNext}
                clicked={() => this.handlePrevNextSanad(+1)}
                icon={<ChevronRightIcon />}
              />
            </Toolbar>
          </AppBar>
        </Slide>
      </React.Fragment>
    );
  };
};

const mapStateToProps = state => {
  return {
    narrators: state.sanadData.narrators,
    sanadPos: state.sanadPosition.sanadPos,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onChangeSanadPos: (num) => dispatch({ type: SANADPOSITION, pos: num }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(withTheme(HideAppBar)));