import React, { useState, useRef, useEffect, useCallback } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';

import CodeVerificationStep from './CodeVerificationStep';
import SuccessStep from './SuccessStep';
import { switchServer } from '../../sender/api';

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
    textAlign: 'center',
    paddingLeft: 24,
    paddingRight: 24
  }
});

const ForgotPasswordForm = props => {
  const classes = useStyles();
  const [step, setStep] = useState('email');
  const [email, setEmail] = useState('');
  const [error, setError] = useState(null);
  const [fieldErrors, setFieldErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);
  const [resendMessage, setResendMessage] = useState(null);
  const cooldownIntervalRef = useRef(null);
  const emailInputRef = useRef(null);

  useEffect(() => {
    if (emailInputRef.current) {
      emailInputRef.current.focus();
    }
  }, []);

  useEffect(() => {
    if (resendCooldown > 0) {
      cooldownIntervalRef.current = setInterval(() => {
        setResendCooldown(prev => {
          if (prev <= 1) {
            clearInterval(cooldownIntervalRef.current);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (cooldownIntervalRef.current) {
        clearInterval(cooldownIntervalRef.current);
      }
    };
  }, [resendCooldown]);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    setError(null);
    setFieldErrors({});
  };

  const handleRequestCode = () => {
    setError(null);
    setFieldErrors({});

    if (!email) {
      setFieldErrors({ email: 'Email is required.' });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setFieldErrors({ email: 'Please enter a valid email address.' });
      return;
    }

    setLoading(true);

    fetch(switchServer + 'users/forgot-password', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: email })
    })
      .then(res => {
        if (!res.ok) {
          return res.json().then(err => { throw err; });
        }
        return res.json();
      })
      .then(data => {
        setLoading(false);
        setResendCooldown(120);
        setStep('code');
      })
      .catch(err => {
        setLoading(false);
        if (err.errors) {
          setFieldErrors(err.errors);
        } else if (err.message && err.message.includes('Please wait')) {
          setError(err.message);
          setResendCooldown(120);
        } else if (err.message) {
          setError(err.message);
        } else {
          setError('Something went wrong. Please try again.');
        }
      });
  };

  const handleEmailKeyPress = (event) => {
    if (event.key === 'Enter' && !loading) {
      handleRequestCode();
    }
  };

  const handleVerify = useCallback((code, newPassword, confirmPassword) => {
    setError(null);

    fetch(switchServer + 'users/forgot-password/confirm', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: email,
        code: code,
        new_password: newPassword,
        password_confirmation: confirmPassword
      })
    })
      .then(res => {
        if (!res.ok) {
          return res.json().then(err => { throw err; });
        }
        return res.json();
      })
      .then(data => {
        setStep('success');
      })
      .catch(err => {
        if (err.message === 'Invalid verification code') {
          setError('Invalid code. Please try again.');
        } else if (err.message === 'Verification code expired') {
          setError('Code expired. Please request a new code.');
          setStep('email');
          setResendCooldown(0);
        } else if (err.message === 'User not found') {
          setError('No account found with this email. Please check and try again.');
          setStep('email');
        } else if (err.errors) {
          const firstError = Object.values(err.errors)[0];
          setError(firstError);
        } else if (err.message) {
          setError(err.message);
        } else {
          setError('Something went wrong. Please try again.');
        }
      });
  }, [email]);

  const handleResend = useCallback(() => {
    setResendMessage(null);
    setError(null);

    fetch(switchServer + 'users/forgot-password', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: email })
    })
      .then(res => {
        if (!res.ok) {
          return res.json().then(err => { throw err; });
        }
        return res.json();
      })
      .then(data => {
        setResendMessage('New code sent! Check your email.');
        setResendCooldown(120);
        setTimeout(() => setResendMessage(null), 5000);
      })
      .catch(err => {
        if (err.message) {
          setError(err.message);
        } else {
          setError('Failed to resend code. Please try again.');
        }
      });
  }, [email]);

  const handleBackToEmail = useCallback(() => {
    setStep('email');
    setError(null);
    setFieldErrors({});
    setResendMessage(null);
    setResendCooldown(0);
    setTimeout(() => {
      if (emailInputRef.current) {
        emailInputRef.current.focus();
      }
    }, 100);
  }, []);

  if (step === 'code') {
    return (
      <CodeVerificationStep
        email={email}
        onVerify={handleVerify}
        onResend={handleResend}
        onBack={handleBackToEmail}
        error={error}
        cooldown={resendCooldown}
        resendMessage={resendMessage}
        loading={loading}
      />
    );
  }

  if (step === 'success') {
    return <SuccessStep onClose={props.onClose} />;
  }

  return (
    <DialogContent className={classes.setPadding}>
      <DialogTitle className={classes.toFlex} disableTypography id='forgot-password-dialog'>
        <Avatar
          alt='GetHadith Logo'
          src={'https://res.cloudinary.com/gethadith/image/upload/v1568578286/books/get-hadith-logo.png'}
          className={classes.avatar}
        />
        <Typography className={classes.setFontWeight} variant='h4' color='textPrimary'>
          Reset Password
        </Typography>
        <Typography variant='subtitle2' color='textSecondary'>
          Enter your email to receive a verification code
        </Typography>
      </DialogTitle>
      <TextField
        inputRef={emailInputRef}
        onChange={handleEmailChange}
        onKeyPress={handleEmailKeyPress}
        id="outlined-forgot-email-input"
        label="Email"
        classes={{ root: classes.textField }}
        type="email"
        name="forgot-email"
        autoComplete="email"
        margin="normal"
        variant="outlined"
        value={email}
        error={!!fieldErrors.email}
        helperText={fieldErrors.email || ''}
      />
      {error && !fieldErrors.email && !error.includes('Please wait') && (
        <Typography className={classes.errorMessage} variant="body2">
          {error}
        </Typography>
      )}
      {resendCooldown > 0 && (
        <Typography className={classes.errorMessage} variant="body2" style={{ color: '#ff9800' }}>
          Please wait before requesting a new code.
        </Typography>
      )}
      <div className={classes.toFlex}>
        <Link
          component="button"
          variant="body2"
          onClick={props.onClose}
          className={classes.toggleMode}
        >
          Back to sign in
        </Link>
      </div>
      <DialogActions className={classes.setMarginFlexWidth}>
        <Button
          onClick={handleRequestCode}
          variant='contained'
          color="primary"
          disabled={loading || !email}
          style={{ width: 'inherit', margin: '8px 16px' }}
        >
          {loading ? <CircularProgress size={24} color="inherit" /> : 'Send Code'}
        </Button>
      </DialogActions>
    </DialogContent>
  );
};

export default React.memo(ForgotPasswordForm);
