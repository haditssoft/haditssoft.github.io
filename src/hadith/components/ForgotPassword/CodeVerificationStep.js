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
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import CircularProgress from '@material-ui/core/CircularProgress';

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

const CodeVerificationStep = props => {
  const classes = useStyles();
  const [code, setCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [localError, setLocalError] = useState(null);
  const codeInputRef = useRef(null);

  useEffect(() => {
    if (codeInputRef.current) {
      codeInputRef.current.focus();
    }
  }, []);

  const handleCodeChange = (event) => {
    const value = event.target.value.replace(/\D/g, '').slice(0, 6);
    setCode(value);
    setLocalError(null);
  };

  const handleNewPasswordChange = (event) => {
    setNewPassword(event.target.value);
    setLocalError(null);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
    setLocalError(null);
  };

  const handleSubmit = () => {
    setLocalError(null);

    if (code.length !== 6) {
      setLocalError('Please enter a valid 6-digit code.');
      return;
    }
    if (!newPassword) {
      setLocalError('Please enter a new password.');
      return;
    }
    if (newPassword !== confirmPassword) {
      setLocalError('Passwords do not match.');
      return;
    }

    props.onVerify(code, newPassword, confirmPassword);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter' && !props.loading) {
      handleSubmit();
    }
  };

  const displayError = localError || props.error;

  return (
    <DialogContent className={classes.setPadding}>
      <DialogTitle className={classes.toFlex} disableTypography id='reset-password-code-dialog'>
        <Avatar
          alt='GetHadith Logo'
          src={'https://res.cloudinary.com/gethadith/image/upload/v1568578286/books/get-hadith-logo.png'}
          className={classes.avatar}
        />
        <Typography className={classes.setFontWeight} variant='h4' color='textPrimary'>
          Enter Verification Code
        </Typography>
        <Typography variant='subtitle2' color='textSecondary'>
          Enter the 6-digit code sent to your email
        </Typography>
      </DialogTitle>
      <TextField
        inputRef={codeInputRef}
        onChange={handleCodeChange}
        onKeyPress={handleKeyPress}
        id="outlined-forgot-code-input"
        label="Verification Code"
        classes={{ root: classes.textField }}
        type="text"
        name="forgot-verification-code"
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
      <TextField
        onChange={handleNewPasswordChange}
        onKeyPress={handleKeyPress}
        id="outlined-new-password-input"
        label="New Password"
        classes={{ root: classes.textField }}
        type={showNewPassword ? 'text' : 'password'}
        name="new-password"
        autoComplete="new-password"
        margin="normal"
        variant="outlined"
        value={newPassword}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                edge="end"
                size="small"
                onClick={() => setShowNewPassword(!showNewPassword)}
                aria-label="toggle new password visibility"
                tabIndex={-1}
              >
                {showNewPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          )
        }}
      />
      <TextField
        onChange={handleConfirmPasswordChange}
        onKeyPress={handleKeyPress}
        id="outlined-confirm-password-input"
        label="Confirm New Password"
        classes={{ root: classes.textField }}
        type={showConfirmPassword ? 'text' : 'password'}
        name="confirm-new-password"
        autoComplete="new-password"
        margin="normal"
        variant="outlined"
        value={confirmPassword}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                edge="end"
                size="small"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                aria-label="toggle confirm password visibility"
                tabIndex={-1}
              >
                {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          )
        }}
      />
      {displayError && (
        <Typography className={classes.errorMessage} variant="body2">
          {displayError}
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
          Back to email
        </Link>
      </div>
      <DialogActions className={classes.setMarginFlexWidth}>
        <Button
          onClick={handleSubmit}
          variant='contained'
          color="primary"
          disabled={props.loading || code.length !== 6 || !newPassword || !confirmPassword}
          style={{ width: 'inherit', margin: '8px 16px' }}
        >
          {props.loading ? <CircularProgress size={24} color="inherit" /> : 'Reset Password'}
        </Button>
        <Button
          onClick={props.onResend}
          variant='text'
          color="primary"
          disabled={props.loading || props.cooldown > 0}
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

export default React.memo(CodeVerificationStep);
