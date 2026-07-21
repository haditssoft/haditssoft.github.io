import React, { useState, useRef, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import TextField from '@material-ui/core/TextField';

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
  textField: {
    width: '-webkit-fill-available',
    display: 'flex',
    flexWrap: 'wrap',
    marginLeft: 24,
    marginRight: 24,
  },
  toggleMode: {
    marginTop: 10,
    cursor: 'pointer'
  },
  errorMessage: {
    color: '#f44336',
    marginTop: 8,
    textAlign: 'center'
  },
  successMessage: {
    color: '#4caf50',
    marginTop: 8,
    textAlign: 'center'
  }
});

const formatCooldown = (seconds) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};

const VerifyForm = props => {
  const classes = useStyles();
  const [code, setCode] = useState('');
  const codeInputRef = useRef(null);

  useEffect(() => {
    if (codeInputRef.current) {
      codeInputRef.current.focus();
    }
  }, []);

  const handleChange = (event) => {
    const value = event.target.value.replace(/\D/g, '').slice(0, 6);
    setCode(value);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter' && code.length === 6) {
      props.onVerify(code);
    }
  };

  const handleVerifyClick = () => {
    if (code.length === 6) {
      props.onVerify(code);
    }
  };

  return (
    <DialogContent className={classes.setPadding}>
      <DialogTitle className={classes.toFlex} disableTypography id='verify-email-dialog'>
        <Avatar
          alt='GetHadith Logo'
          src={'https://res.cloudinary.com/gethadith/image/upload/v1568578286/books/get-hadith-logo.png'}
          className={classes.avatar}
        />
        <Typography className={classes.setFontWeight} variant='h4' color='textPrimary'>
          Verify Your Email
        </Typography>
        <Typography variant='subtitle2' color='textSecondary'>
          Enter the 6-digit code sent to your email
        </Typography>
      </DialogTitle>
      <TextField
        inputRef={codeInputRef}
        onChange={handleChange}
        onKeyPress={handleKeyPress}
        id="outlined-verify-code-input"
        label="Verification Code"
        classes={{ root: classes.textField }}
        type="text"
        name="verification-code"
        autoComplete="one-time-code"
        margin="normal"
        variant="outlined"
        value={code}
        inputProps={{
          maxLength: 6,
          inputMode: 'numeric',
          pattern: '[0-9]*'
        }}
      />
      {props.error && (
        <Typography className={classes.errorMessage} variant="body2">
          {props.error}
        </Typography>
      )}
      {props.resendMessage && (
        <Typography className={classes.successMessage} variant="body2">
          {props.resendMessage}
        </Typography>
      )}
      <div className={classes.toFlex}>
        <Link
          component="button"
          variant="body2"
          onClick={props.onBack}
          className={classes.toggleMode}
        >
          Back to sign in
        </Link>
      </div>
      <DialogActions className={classes.setMarginFlexWidth}>
        <Button
          onClick={handleVerifyClick}
          variant='contained'
          color="primary"
          disabled={code.length !== 6}
          style={{ width: 'inherit', margin: '8px 16px' }}
        >
          Verify
        </Button>
        <Button
          onClick={props.onResend}
          variant='text'
          color="primary"
          disabled={props.cooldown > 0}
          style={{ width: 'inherit', margin: '8px 16px' }}
        >
          {props.cooldown > 0
            ? `Resend code (${formatCooldown(props.cooldown)})`
            : 'Resend code'}
        </Button>
      </DialogActions>
    </DialogContent>
  );
};

export default React.memo(VerifyForm);
