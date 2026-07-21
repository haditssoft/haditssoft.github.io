import React, { useState, useRef, useEffect, useCallback } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';

import EmailInput from './items/EmailInput';
import PasswordInput from './items/PasswordInput';
import PasswordConfirmInput from './items/PasswordConfirmInput';
import SkipButton from './items/SkipButton';
import VerifyForm from './items/VerifyForm';
import { connect } from 'react-redux';
import { LOGIN_STATE } from '../../store/action';
// import getHadithLogo from '../../assets/images/get-hadith-logo.png';
import { switchServer, setAuthData, getToken } from '../../sender/api';

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
})

const FormComponent = props => {
  const classes = useStyles();
  const [mode, setMode] = useState('signin'); // 'signin' or 'signup'
  const [step, setStep] = useState('signin'); // 'signin', 'signup', or 'verify'
  const [verificationError, setVerificationError] = useState(null);
  const [signupError, setSignupError] = useState(null);
  const [resendCooldown, setResendCooldown] = useState(0);
  const [resendMessage, setResendMessage] = useState(null);
  const saveEmailRef = useRef('');
  const savePasswordRef = useRef('');
  const saveConfirmPasswordRef = useRef('');
  const cooldownIntervalRef = useRef(null);

  useEffect(() => {
    const pending = localStorage.getItem('emailVerificationPending');
    if (pending === 'true' && getToken()) {
      setStep('verify');
    }
  }, []);

  useEffect(() => {
    if (props.startInVerifyMode && getToken()) {
      setStep('verify');
    }
  }, [props.startInVerifyMode]);

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

  const setEmailRef = (email) => {
    saveEmailRef.current = email;
  }
  const setPasswordRef = (pass) => {
    savePasswordRef.current = pass;
  }
  const setConfirmPasswordRef = (pass) => {
    saveConfirmPasswordRef.current = pass;
  }

  const handleVerify = useCallback((code) => {
    setVerificationError(null);
    const token = getToken();
    fetch(switchServer + 'users/verify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
      body: JSON.stringify({ code: code })
    })
      .then(res => {
        if (!res.ok) {
          return res.json().then(err => { throw new Error(err.message || 'Verification failed'); });
        }
        return res.json();
      })
      .then(data => {
        localStorage.removeItem('emailVerificationPending');
        props.onLoginStateUpdate();
        props.handleClose();
      })
      .catch(error => {
        if (error.message === 'Verification code expired') {
          setVerificationError('Code expired. Please request a new code.');
        } else if (error.message === 'Invalid verification code') {
          setVerificationError('Invalid code. Please try again.');
        } else if (error.message === 'Email already verified') {
          localStorage.removeItem('emailVerificationPending');
          props.onLoginStateUpdate();
          props.handleClose();
        } else {
          setVerificationError(error.message);
        }
      });
  }, [props]);

  const handleResend = useCallback(() => {
    setResendMessage(null);
    setVerificationError(null);
    const token = getToken();
    fetch(switchServer + 'users/verify/resend', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + token
      }
    })
      .then(res => {
        if (!res.ok) {
          return res.json().then(err => { throw new Error(err.message || 'Failed to resend code'); });
        }
        return res.json();
      })
      .then(data => {
        setResendMessage('New code sent! Check your email.');
        setResendCooldown(120);
        setTimeout(() => setResendMessage(null), 5000);
      })
      .catch(error => {
        if (error.message === 'Email already verified') {
          localStorage.removeItem('emailVerificationPending');
          props.onLoginStateUpdate();
          props.handleClose();
        } else {
          setVerificationError(error.message);
        }
      });
  }, [props]);

  const handleBackToSignIn = useCallback(() => {
    setStep('signin');
    setMode('signin');
    setVerificationError(null);
    setResendMessage(null);
    setResendCooldown(0);
  }, []);

  const handleSubmit = () => {
    const email = saveEmailRef.current,
      password = savePasswordRef.current,
      confirmPassword = saveConfirmPasswordRef.current;

    setSignupError(null);

    if (mode === 'signup') {
      if (password !== confirmPassword) {
        setSignupError('Passwords do not match.');
        return;
      }
      fetch(switchServer + 'users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: email,
          password: password,
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
          if (data.token) {
            setAuthData(data);
            localStorage.setItem('emailVerificationPending', 'true');
            setResendCooldown(120);
            setStep('verify');
          } else {
            throw new Error('No token received');
          }
        })
        .catch(function (err) {
          if (err.data && err.data.includes('UNIQUE constraint failed: User.Email')) {
            setSignupError('This email is already registered. Please use a different email or sign in.');
          } else if (err.errors) {
            const firstError = Object.values(err.errors)[0];
            setSignupError(firstError);
          } else {
            setSignupError(err.message || 'Failed to sign up. Please try again.');
          }
        });
    } else {
      fetch(switchServer + 'auths/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: email,
          password: password
        })
      })
        .then(res => {
          if (!res.ok) {
            return res.json().then(err => { throw new Error(err.message || 'Failed to sign in'); });
          }
          return res.json();
        })
        .then(data => {
          if (data.token) {
            setAuthData(data);
            props.onLoginStateUpdate();
            props.handleClose();
          } else {
            throw new Error('No token received');
          }
        })
        .catch(function (error) {
          alert(error.message);
        });
    }
  }

  if (step === 'verify') {
    return (
      <VerifyForm
        onVerify={handleVerify}
        onResend={handleResend}
        onBack={handleBackToSignIn}
        error={verificationError}
        cooldown={resendCooldown}
        resendMessage={resendMessage}
      />
    );
  }

  return (
    <DialogContent className={classes.setPadding}>
      <DialogTitle className={classes.toFlex} disableTypography id='sign-in-dialog'>
        <Avatar
          alt='GetHadith Logo'
          src={'https://res.cloudinary.com/gethadith/image/upload/v1568578286/books/get-hadith-logo.png'}
          className={classes.avatar}
        />
        <Typography className={classes.setFontWeight} variant='h4' color='textPrimary'>
          {mode === 'signin' ? 'Sign in' : 'Sign up'}
        </Typography>
        <Typography variant='subtitle2' color='textSecondary'>
          to preserve your data
        </Typography>
      </DialogTitle>
      <EmailInput setEmailRef={setEmailRef} />
      <PasswordInput handleSubmitSignUp={handleSubmit} setPasswordRef={setPasswordRef} />
      {mode === 'signup' && (
        <PasswordConfirmInput handleSubmitSignUp={handleSubmit} setConfirmPasswordRef={setConfirmPasswordRef} />
      )}
      {signupError && (
        <Typography className={classes.errorMessage} variant="body2">
          {signupError}
        </Typography>
      )}
      <div className={classes.toFlex}>
        <Link
          component="button"
          variant="body2"
          onClick={() => {
            setMode(mode === 'signin' ? 'signup' : 'signin');
            setSignupError(null);
          }}
          className={classes.toggleMode}
        >
          {mode === 'signin' ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
        </Link>
      </div>
      <DialogActions className={classes.setMarginFlexWidth}>
        <Button onClick={handleSubmit} variant='contained' color="primary" style={{ width: 'inherit', margin: '8px 16px' }}>
          {mode === 'signin' ? 'Sign in' : 'Sign up'}
        </Button>
        <SkipButton handleClose={props.handleClose} />
      </DialogActions>
    </DialogContent>
  );
}

const mapDispatchToProps = dispatch => {
  return {
    onLoginStateUpdate: () => dispatch({ type: LOGIN_STATE })
  };
};

export default connect(null, mapDispatchToProps)(React.memo(FormComponent));