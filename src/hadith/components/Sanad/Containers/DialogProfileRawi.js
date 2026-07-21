import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import Slide from '@material-ui/core/Slide';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';

import { connect } from 'react-redux';
import { DIALOGPROFILERAWI, SHOWPROFILE } from '../../../store/action';
import DialogProfileRawiChild from '../Components/DialogProfileRawiChild';

const useStyles = makeStyles(theme => ({
  setBackgroundColor: {
    backgroundColor: theme.palette.type === 'dark' ? '#1D1D1D' : theme.palette.grey[100]
  }
}))

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='right' ref={ref} {...props} />;
});

let isOpen = false, ariaLabel = '', narrator, sanadPosition;

const DialogProfileRawi = props => {
  const classes = useStyles();

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));
  const smallUp = useMediaQuery(theme.breakpoints.up('md'));

  useEffect(() => {
    if (props.showDialogProfileRawi) {
      if (smallUp) {
        setTimeout(() => {
          props.onShowDialogProfileRawi('');
          props.onShowProfile(true);
        }, 1000);
      }
    }
  }, [smallUp, props.showDialogProfileRawi]);

  const handleClose = () => {
    props.onShowDialogProfileRawi('');
  }

  switch (props.showDialogProfileRawi) {
    case 'profileRawi':
      isOpen = true;
      ariaLabel = 'dialog-profile-rawi';
      narrator = null;
      sanadPosition = null;
      break;
    case 'detailsColor':
      isOpen = true;
      ariaLabel = 'dialog-details-color';
      narrator = props.narrators;
      sanadPosition = props.sanadPos;
      break;
    default:
      isOpen = false;
      ariaLabel = '';
      narrator = null;
      sanadPosition = null;
      break;
  }

  return (
    <Dialog
      style={{ zIndex: 1400 }}
      classes={{ paper: classes.setBackgroundColor }}
      fullScreen={fullScreen}
      maxWidth='xs'
      open={isOpen}
      onClose={handleClose}
      aria-labelledby={ariaLabel}
      TransitionComponent={Transition}
    >
      <DialogProfileRawiChild
        ariaLabel={ariaLabel}
        narrators={narrator}
        sanadPos={sanadPosition}
        tirggerClose={handleClose}
      />
    </Dialog>
  );
}

const mapStateToProps = state => {
  return {
    showDialogProfileRawi: state.dialogProfileRawi.showDialogProfileRawi,
    narrators: state.sanadData.narrators,
    sanadPos: state.sanadPosition.sanadPos
  };
}

const mapDispatchToProps = dispatch => {
  return {
    onShowDialogProfileRawi: (str) => dispatch({ type: DIALOGPROFILERAWI, show: str }),
    onShowProfile: (booLean) => dispatch({ type: SHOWPROFILE, open: booLean })
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DialogProfileRawi);