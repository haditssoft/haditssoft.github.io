import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles({
  setPadding: {
    paddingBottom: 20,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: 10,
    width: 30,
    height: 30
  },
  toFlex: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingBottom: 8
  },
  setFontWeight: {
    fontWeight: 300
  },
  setMarginFlexWidth: {
    width: '-webkit-fill-available',
    marginTop: 20,
    flexDirection: 'column',
    justifyContent: 'space-evenly'
  },
  successMessage: {
    marginTop: 8,
    textAlign: 'center',
    paddingLeft: 24,
    paddingRight: 24,
    color: 'inherit'
  }
});

const SuccessStep = props => {
  const classes = useStyles();

  return (
    <DialogContent className={classes.setPadding}>
      <DialogTitle className={classes.toFlex} disableTypography id='forgot-password-success-dialog'>
        <Avatar
          alt='GetHadith Logo'
          src={'https://res.cloudinary.com/gethadith/image/upload/v1568578286/books/get-hadith-logo.png'}
          className={classes.avatar}
        />
        <Typography className={classes.setFontWeight} variant='h4' color='textPrimary'>
          Password Reset
        </Typography>
        <Typography variant='subtitle2' color='textSecondary'>
          Successful
        </Typography>
      </DialogTitle>
      <Typography className={classes.successMessage} variant='body2'>
        Your password has been reset successfully. You can now sign in with your new password.
      </Typography>
      <DialogActions className={classes.setMarginFlexWidth}>
        <Button
          onClick={props.onClose}
          variant='contained'
          color="primary"
          style={{ width: 'inherit', margin: '8px 16px' }}
        >
          Login
        </Button>
      </DialogActions>
    </DialogContent>
  );
};

export default React.memo(SuccessStep);
