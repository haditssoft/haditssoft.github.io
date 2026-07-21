import React from 'react';
import { withStyles, withTheme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Paper from '@material-ui/core/Paper';
import withMobileDialog from '@material-ui/core/withMobileDialog';
import Draggable from 'react-draggable';
import Grid from '@material-ui/core/Grid';

import { connect } from 'react-redux';
import { OPENINFO, TEXTINFO } from '../../store/action';
import SideMenuList from './SideMenuList';
import DefinitionRT from './Content/Definition';
import NarrationWayRT from './Content/NarrationWay';
import ToWhomRT from './Content/ToWhom';
import StrongAndWeakRT from './Content/StrongAndWeak';
import InvalidChainRT from './Content/InvalidChain';
import SuspicionFlawRT from './Content/SuspicionFlaw';
import JarhTadilTermRT from './Content/JarhTadilTerm';
import StandardBookRT from './Content/StandardBook';

const styles = theme => ({
  root: {
    userSelect: 'none',
  },
  setDirectionRow: {
    width: '100%',
    height: '100%',
    display: 'flex',
    overflow: 'hidden',
    boxSizing: 'border-box',
    flexDirection: 'row'
  },
  setToFlex: {
    display: 'flex',
    flexDirection: 'column',
    width: '70%',
    height: 'auto'
  },
  setMenuListWidth: {
    display: 'flex', // responsible for vertically justify of SideMenuList
    width: '30%',
    overflowY: 'auto',
    height: 'auto',
    backgroundColor: theme.palette.primary.main // 'dodgerblue',
  },
});

function PaperComponent(props) {
  return (
    <Draggable
      handle="#draggable-info-dialog"
      enableUserSelectHack={false}
    >
      <Paper {...props} />
    </Draggable>
  );
};

class DraggableDialog extends React.Component {

  shouldComponentUpdate(nextProps) {
    if (this.props.theme.palette.type !== nextProps.theme.palette.type) {
      return true;
    }
    if (nextProps.openBiography === this.props.openBiography && this.props.openBiography === false) {
      return false;
    };
    return true;
  };

  componentDidUpdate() {
    setTimeout(() => {
      if (this.props.openInfo === false && this.props.textInfo !== '') {
        this.props.onStoreTextInfo('');
      };
    }, 2000);
  };

  handleClose = () => {
    this.props.onOpenCloseInfo(false);
  };

  render() {
    const { classes, fullScreen, openInfo, contentInfo } = this.props;
    let displayedContent = null;
    switch (contentInfo) {
      case 0:

        break;
      case 1:
        displayedContent = <DefinitionRT />;
        break;
      case 2:
        displayedContent = <NarrationWayRT />;
        break;
      case 3:
        displayedContent = <ToWhomRT />;
        break;
      case 4:
        displayedContent = <StrongAndWeakRT />;
        break;
      case 5:
        displayedContent = <InvalidChainRT />;
        break;
      case 6:
        displayedContent = <SuspicionFlawRT />;
        break;
      case 7:
        displayedContent = <JarhTadilTermRT />;
        break;
      case 8:
        displayedContent = <StandardBookRT />;
        break;
    }

    return (
      <Dialog
        open={openInfo}
        onClose={this.handleClose}
        PaperComponent={PaperComponent}
        // scroll='paper'
        fullWidth={true}
        maxWidth='md'
        fullScreen={fullScreen}
        aria-labelledby='draggable-info-dialog'
      >
        <Grid className={classes.setDirectionRow}>
          <Grid item className={classes.setMenuListWidth}>
            <SideMenuList />
          </Grid>
          <Grid item className={classes.setToFlex}>
            <DialogTitle classes={{ root: classes.root }} id='draggable-info-dialog' onMouseDown={e => e.preventDefault()}>
              Informasi
                </DialogTitle>
            <DialogContent>
              <DialogContentText component='span'>
                {displayedContent}
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleClose} color='primary'>
                Close
                    </Button>
            </DialogActions>
          </Grid>
        </Grid>
      </Dialog>
    );
  };
};

const mapStateToProps = state => {
  return {
    openInfo: state.info.openInfo,
    textInfo: state.info.textInfo,
    contentInfo: state.info.contentInfo
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onStoreTextInfo: (value) => dispatch({ type: TEXTINFO, text: value }),
    onOpenCloseInfo: (booLean) => dispatch({ type: OPENINFO, open: booLean })
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withMobileDialog()(withStyles(styles)(withTheme(DraggableDialog))));
