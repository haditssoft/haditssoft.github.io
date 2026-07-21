import React, { useEffect, useRef } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Slide from '@material-ui/core/Slide';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';

import { connect } from 'react-redux';
import { TABDIALOG, SIMILARDATA, INDEXLEFTTAB, TITLEFORLOAD } from '../../store/action';
import { isSizeSmall } from '../../store/currentScreenSize';
import TabDialogChild from './TabDialogChild';
import sender from '../../sender/senderDataRequest';
import getKitabName from '../../fungsi/getKitabName';
import setCloseDialogTab, { closeDialogTab } from '../../fungsi/closeDialogTab';

import { useLocation, useHistory } from "react-router-dom";
import { matchPath } from "react-router";

const useStyles = makeStyles({
  firstChild: {
    '& > :first-child': {
      padding: 0
    }
  },
  paperDrawerStyle: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column'
  },
  paperWidth: {
    right: 0
  }
})

const Transition = React.forwardRef(function Transition(props, ref) {
  let dir;
  if (props.in) {
    if (props.children.props.children.props.children.props.whichTab === 'right') {
      dir = 'left';
    } else {
      dir = 'right';
    }
  }
  return <Slide direction={dir} ref={ref} {...props} />;
});

const TabDialog = props => {
  const location = useLocation();
  const history = useHistory();

  const classes = useStyles();
  const { showTabDialog, whichTab } = props;

  const showTabDialogRef = useRef();

  useEffect(() => {
    showTabDialogRef.current = showTabDialog;
  });
  const prevShowTabDialogValue = showTabDialogRef.current;

  useEffect(() => {
    setCloseDialogTab(props.onShowTabDialog);
  }, []);

  useEffect(() => {
    if (showTabDialog !== prevShowTabDialogValue) {
      if (showTabDialog) {
        if (whichTab === 'right') {
          switch (props.rightTab) {
            case 1: // sanad tab
              // Get the sanad's data first and then show SanadElement in dispatchSanad of Sanad.js
              if (props.kitabName) {
                const getTheNameOfKitab = getKitabName(props.kitabName);
                sender('loadSanadHadits', ['Sanad' + getTheNameOfKitab, +props.nomer]);
              }
              break;
            case 2:  // similar tab
              // Get the similar's data first and then show similar in dispatchSimilar of similarList.js
              if (props.kitabName) {
                if (props.whatDataIsShown !== SIMILARDATA) {
                  const getTheNameOfKitab = getKitabName(props.kitabName);
                  sender('loadSimilarHadith', ['Banding' + getTheNameOfKitab, +props.nomer]);
                }
              }
              break;
            default:
              break;
          }
        }
      }      
    }
  }, [
      showTabDialog,
      whichTab,
      props.rightTab,
      props.kitabName,
      props.nomer,
      props.whatDataIsShown
    ]);

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));
  const smallUp = useMediaQuery(theme.breakpoints.up('md'));

  useEffect(() => {
    if (props.showTabDialog) {
      if (smallUp) {
        setTimeout(() => {
          props.onShowTabDialog(false, 'left');
        }, 1000);
      }
    }
  }, [props.showTabDialog, smallUp]);

  const handleClose = (open, side) => (event) => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    side = side ? side : 'left';
    if (open) {
      history.push(`/${side}`, { ref: location.pathname + location.search });
    } else {
      if (location.state) {
        if (location.state.ref) {
          history.replace(/^\/left$|^\/right$/.test(location.state.ref) ? '/' : location.state.ref);
        }
      } else {
        history.replace('/');
      }
    }
    // props.onShowTabDialog(open, side ? side : 'left');
  }

  useEffect(() => {
    const matchBookmark = matchPath(location.pathname, {
      path: '/bookmark/:title/:bookmark_number/:imam/:hadith_number',
      exact: true,
      strict: true,
      sensitive: true,
    });
    if (matchBookmark && history.action === 'POP' && !props.listTitle.length) {
      // ga usah bingung lg ini kode yg bener2 menghandle pertamakali mengunjungi url bookmark
      // ini adalah tahap pertama, tahap kedua di InputAndCombo.js lalu TextField.js
      // kode ini untuk menghandle jika pertama kali mengunjungi url by type on address bar then press enter
      // apabila url nya menunjukkan untuk membuka hadits bookmark
      // tujuan drawer kiri dibuka agar komponentnya termount (didMount) 
      // supaya bisa di munculkan judul bookmark yg mau ditampilkan by url
      props.onLeftTabIndexChanged(3); // 3 adalah index tab bookmark
      props.onShowTabDialog(true, 'left');
    }
  }, [location.pathname]);

  useEffect(() => {
    if (isSizeSmall) {
      if (location.pathname === '/left' || location.pathname === '/right') {
        props.onShowTabDialog(true, location.pathname.replace('/', ''));
      } else {
        if (history.action !== 'POP') {
          if (location.state) {
            // kegunaan location.state.tab perlu di cek ulang, pakah msh terpakai atau tdk
            if (location.state.tab) {
              props.onShowTabDialog(false, location.state.tab);
            }
          } else {
            props.onShowTabDialog(false, 'left');
          }
        }
      }
    }
}, [location.pathname]);

  let DialogOrDrawer = null;
  if (fullScreen) {
    const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent);
    DialogOrDrawer = (
      <>
        <SwipeableDrawer
          classes={{ paperAnchorLeft: classes.paperWidth }}
          PaperProps={{ className: clsx(classes.firstChild, classes.paperDrawerStyle) }}
          open={showTabDialog && whichTab === 'left'}
          onClose={handleClose(false)}
          onOpen={handleClose(true)}
          disableBackdropTransition={!iOS}
          disableDiscovery={iOS}
        >
          {(showTabDialog && whichTab === 'left') ? <TabDialogChild tirggerClose={handleClose(false)} whichTab={whichTab} /> : null}
        </SwipeableDrawer>
        <SwipeableDrawer
          // set variant to permanent when there is a dialog (profile rawi or sanad diagram) on top
          // so that this swipeablecomponent won't triggered
          // when swiping around the dialog on top of it
          variant={props.showDialogProfileRawi || props.openDiagramSanad ? 'permanent' : 'temporary'}
          anchor='right'
          classes={{ paperAnchorLeft: classes.paperWidth }}
          PaperProps={{ className: clsx(classes.firstChild, classes.paperDrawerStyle) }}
          open={showTabDialog && whichTab === 'right'}
          onClose={handleClose(false, 'left')}
          onOpen={handleClose(true, 'right')}
          disableBackdropTransition={!iOS}
          disableDiscovery={iOS}
        >
          {(showTabDialog && whichTab === 'right') ? <TabDialogChild tirggerClose={handleClose(false, 'left')} whichTab={whichTab} /> : null}
        </SwipeableDrawer>
      </>
    );
  } else {
    DialogOrDrawer = (
      <Dialog
        PaperProps={{ className: classes.firstChild }}
        fullScreen={fullScreen}
        maxWidth='xs'
        open={showTabDialog}
        onClose={handleClose(false)}
        aria-labelledby="tab-dialog"
        TransitionComponent={Transition}
      >
        <TabDialogChild tirggerClose={handleClose(false)} whichTab={whichTab} />
      </Dialog>
    );
  }

  return DialogOrDrawer;
}

const mapStateToProps = state => {
  return {
    showTabDialog: state.tabDialog.showTabDialog,
    whichTab: state.tabDialog.whichTab,
    kitabName: state.mainBooksData.KitabName,
    nomer: state.mainBooksData.Nomer,
    whatDataIsShown: state.mainBooksData.WhatDataIsShown,
    rightTab: state.indexTab.rightTab,
    showDialogProfileRawi: state.dialogProfileRawi.showDialogProfileRawi,
    openDiagramSanad: state.diagramSanad.openDiagramSanad,
    listTitle: state.inputComboValue.listTitle,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    onShowTabDialog: (booLean, str) => dispatch({ type: TABDIALOG, show: booLean, side: str }),
    onLeftTabIndexChanged: (val) => dispatch({ type: INDEXLEFTTAB, index: val }),
    onTitleForLoadChanged: (str) => dispatch({ type: TITLEFORLOAD, value: str }),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(TabDialog));