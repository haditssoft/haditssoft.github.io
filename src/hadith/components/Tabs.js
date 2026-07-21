import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import SwipeableViews from 'react-swipeable-views';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Tooltip from '@material-ui/core/Tooltip';
import Zoom from '@material-ui/core/Zoom';
import withWidth from '@material-ui/core/withWidth';

import { connect } from 'react-redux';
import {
  INDEXLEFTTAB,
  INDEXRIGHTTAB,
  SHOWSANAD,
  SHOWSIMILAR,
  SHOWPROFILE,
  ANCHORDETAILSCOLOR,
  SIMILARDATA,
  SHOWDETAILSCOLOR,
  TABBODYHEIGHTREF,
} from '../store/action';
import sender from '../sender/senderDataRequest';
import getKitabName from '../fungsi/getKitabName';
import { bookHaveNoChain } from '../store/arrayOfKitabsName';

function TabContainer({ children, dir, dirID, idx }) {
  // differentiate padding for tab kedudukan, tema from books
  let pad = 0;
  switch (dirID) {
    case 'rtl': // left tab
      if (idx === 0) {
        pad = '24px 24px 100px'; // (8 * 3);
      } else if (idx === 1 || idx === 2) {
        pad = '16px 10px 100px';
      } else if (idx === 3) {
        pad = { padding: '8px 0 0', direction: dir };
      } else {
        pad = 0;
      }
      break;
    case 'ltr': // right tab
      if (idx === 0) {
        pad = 0;
      } else if (idx === 1) {
        pad = { padding: '16px 10px 100px 10px', direction: dir, textAlign: 'center' };
      } else if (idx === 2) {
        pad = '16px 10px 100px 10px';
      } else if (idx === 3) {
        pad = { padding: 0, direction: dir, height: '100%' };
      } else {
        pad = 0;
      }
      break;
    default:
      pad = 0;
      break;
  };

  return (
    <div style={typeof pad === 'object' ? pad : { padding: pad, direction: dir }}>
      {children}
    </div>
  );
};

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
  dir: PropTypes.string.isRequired,
};

const styles = theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    height: '100%',
    // backgroundColor: theme.palette.background.paper,
  },
  tabRoot: {
    minWidth: '20%',
  },
  swep: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    height: '100%',
    '& > :nth-child(1)': {
      height: '100%' // for react-window in RawiSearch to work properly
    },
    '& > :nth-child(1) > :nth-child(2)': {
      marginRight: '1px' // coz scrollbar tema tab shown a little bit in kedudukan tab
    },
  },
});

const tabBodyHeightRef = React.createRef();

class FullWidthTabs extends React.Component {

  tabBarRef = React.createRef();

  shouldComponentUpdate(nextProps) {
    if (this.props.theme.palette.type !== nextProps.theme.palette.type) {
      return true;
    }
    if (nextProps.directIon === 'rtl') {
      if (nextProps.leftTab === this.props.leftTab) {
        return false;
      } else {
        return true;
      }
    } else if (nextProps.directIon === 'ltr') {
      if (nextProps.rightTab === this.props.rightTab) {
        return false;
      } else {
        return true;
      }
    }
  };

  componentDidMount() {
    if (this.props.directIon !== 'rtl') {
      this.props.onSetAnchorDetailsColor(this.tabBarRef.current);
      this.props.onStoreQueryHeight(tabBodyHeightRef.current.rootNode);
    }
  };

  handleChange = (event, value) => {
    this.handleDispatch(value);
  };

  handleChangeIndex = index => {
    this.handleDispatch(index);
  };

  hideProfile_DetailsColor = () => {
    if (this.props.openProfile) this.props.onShowProfile(false);
    if (this.props.openDetailsColor) this.props.onShowDetailsColor(false);
  };

  handleDispatch = (value) => {
    if (this.props.directIon === 'rtl') {
      if (this.props.leftTab !== value) {
        this.props.onLeftTabIndexChanged(value);
      }
    } else {
      if (this.props.rightTab !== value) {
        this.props.onRightTabIndexChanged(value);
        this.hideProfile_DetailsColor();
        if (value === 1) { // sanad tab
          // Get the sanad's data first and then show SanadElement in dispatchSanad of Sanad.js
          if (this.props.kitabName !== '') {
            const getTheNameOfKitab = getKitabName(this.props.kitabName);
            if (bookHaveNoChain.includes(getTheNameOfKitab)) {
              return this.props.onShowSanad(false);
            }
            sender('loadSanadHadits', ['Sanad' + getTheNameOfKitab, +this.props.nomer]);
          }
        } else if (value === 2) { // similar tab
          // Get the similar's data first and then show similar in dispatchSimilar of similarList.js
          if (this.props.kitabName !== '') {
            if (this.props.whatDataIsShown !== SIMILARDATA) {
              const getTheNameOfKitab = getKitabName(this.props.kitabName);
              if (bookHaveNoChain.includes(getTheNameOfKitab)) {
                return this.props.onShowSimilar(false);
              }
              sender('loadSimilarHadith', ['Banding' + getTheNameOfKitab, +this.props.nomer]);
            }
          }
        }
      }
    }
  }

  render() {
    const { classes, theme, tabContent, directIon, leftTab, rightTab } = this.props;

    let swipeStyle;
    if (directIon === 'ltr' && rightTab === 2) {
      swipeStyle = { overflowX: 'hidden', overflowY: 'scroll', direction: directIon };
    } else if (directIon === 'ltr' && rightTab === 3) {
      swipeStyle = { overflow: 'hidden', direction: directIon };
    } else if (directIon === 'rtl' && leftTab === 3) {
      swipeStyle = { overflowX: 'hidden', overflowY: 'scroll', direction: directIon };
    } else {
      swipeStyle = { overflowX: 'hidden', direction: directIon };
    }

    let appBarStyle = { position: 'static', topBottom: { top: 0, bottom: 'auto' } };
    let tabIndicator = { style: { top: 'auto', bottom: 0 } };
    if (this.props.width === 'xs') {
      appBarStyle = { position: 'absolute', topBottom: { top: 'auto', bottom: 0 } };
      tabIndicator = { style: { top: 0, bottom: 'auto' } };
    }

    return (
      <div className={classes.root}>
        <AppBar
          ref={directIon !== 'rtl' ? this.tabBarRef : null}
          elevation={4}
          color='default'
          position={appBarStyle.position}
          style={appBarStyle.topBottom}
        >
          <Tabs
            value={directIon === 'rtl' ? leftTab : rightTab}
            onChange={this.handleChange}
            indicatorColor='primary'
            textColor='primary'
            variant='fullWidth'
            TabIndicatorProps={tabIndicator}
          >
            <Tooltip TransitionComponent={Zoom} title={this.props.tooltip[0]}>
              <Tab className={classes.tabRoot} icon={this.props.icon[0]} />
            </Tooltip>
            <Tooltip TransitionComponent={Zoom} title={this.props.tooltip[1]}>
              <Tab className={classes.tabRoot} icon={this.props.icon[1]} />
            </Tooltip>
            <Tooltip TransitionComponent={Zoom} title={this.props.tooltip[2]}>
              <Tab className={classes.tabRoot} icon={this.props.icon[2]} />
            </Tooltip>
            <Tooltip TransitionComponent={Zoom} title={this.props.tooltip[3]}>
              <Tab className={classes.tabRoot} icon={this.props.icon[3]} />
            </Tooltip>
            <Tooltip TransitionComponent={Zoom} title={this.props.tooltip[4]}>
              <Tab className={classes.tabRoot} icon={this.props.icon[4]} />
            </Tooltip>
          </Tabs>
        </AppBar>
        <SwipeableViews
          ref={tabBodyHeightRef}
          className={classes.swep}
          // slideClassName=''
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={directIon === 'rtl' ? leftTab : rightTab}
          onChangeIndex={this.handleChangeIndex}
          slideStyle={swipeStyle}
        >
          <TabContainer dir={theme.direction} dirID={directIon} idx={0}>{tabContent[0]}</TabContainer>
          <TabContainer dir={theme.direction} dirID={directIon} idx={1}>{tabContent[1]}</TabContainer>
          <TabContainer dir={theme.direction} dirID={directIon} idx={2}>{tabContent[2]}</TabContainer>
          <TabContainer dir={theme.direction} dirID={directIon} idx={3}>{tabContent[3]}</TabContainer>
          <TabContainer dir={theme.direction} dirID={directIon} idx={4}>{tabContent[4]}</TabContainer>
        </SwipeableViews>
      </div>
    );
  };
};

FullWidthTabs.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

const mapStateToProps = state => {
  return {
    leftTab: state.indexTab.leftTab,
    rightTab: state.indexTab.rightTab,
    kitabName: state.mainBooksData.KitabName,
    nomer: state.mainBooksData.Nomer,
    whatDataIsShown: state.mainBooksData.WhatDataIsShown,
    openProfile: state.showProfile.openProfile,
    openDetailsColor: state.showDetailsColor.openDetailsColor
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onLeftTabIndexChanged: (val) => dispatch({ type: INDEXLEFTTAB, index: val }),
    onRightTabIndexChanged: (val) => dispatch({ type: INDEXRIGHTTAB, index: val }),
    onShowSanad: (booLean) => dispatch({ type: SHOWSANAD, show: booLean }),
    onShowSimilar: (booLean) => dispatch({ type: SHOWSIMILAR, show: booLean }),
    onShowProfile: (booLean) => dispatch({ type: SHOWPROFILE, open: booLean }),
    onShowDetailsColor: (booLean) => dispatch({ type: SHOWDETAILSCOLOR, open: booLean }),
    onSetAnchorDetailsColor: (element) => dispatch({ type: ANCHORDETAILSCOLOR, target: element }),
    onStoreQueryHeight: (num) => dispatch({ type: TABBODYHEIGHTREF, height: num })
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles, { withTheme: true })(withWidth()(FullWidthTabs)));
