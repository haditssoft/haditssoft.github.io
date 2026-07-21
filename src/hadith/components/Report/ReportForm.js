import React, { useState, useRef } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';

import ReportInput from './ReportInput';
import SubmitButton from './SubmitButton';
import ReCAPTCHA from 'react-google-recaptcha';
import { connect } from 'react-redux';
import showSnackBar from '../../fungsi/showSnackBar';
import { OPENSNACKBARS, PUSHTOQUEUE } from '../../store/action';
import { switchServer } from '../../sender/api';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'wrap'
  },
  setHeight: {
    // height: 90,
    width: '100%',
    position: 'absolute',
    bottom: 14,
    marginLeft: theme.spacing(3),
    visibility: 'hidden'
    // marginRight: theme.spacing(2)
  }
}));

let kitabName = '';

// imported in senderDataRequest.js in dispatchResult()
export const setKitabName = (name) => {
  kitabName = name;
}

const ReportForm = props => {
  const classes = useStyles();
  const theme = useTheme();

  const reportInputRef = useRef('');
  const recaptchaRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [reject, setReject] = useState('');

  const handleChange = (recaptchaToken) => {
    if (recaptchaToken) {
      setLoading(true);
      fetch(switchServer + 'verifyreCaptcha', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          token: recaptchaToken,
          bookInfo: kitabName,
          reportText: reportInputRef.current
        })
      })
        .then(res => {
          if (res.status !== 200) {
            setLoading(false);
            throw new Error(res.status + ' Gagal mengirim laporan');
          }
          setLoading(false);
          const message = {
            message: 'Laporan berhasil terkirim',
            variant: 'success',
            key: new Date().getTime()
          };
          showSnackBar(props.queueSnackBar, message, props.openSnackBar,
            props.onPushSnackBarsQueue, props.onShowHideSnackBars, props.messageSnackBar);
          // recaptchaRef.current.reset();
        })
        .catch(err => {
          setLoading(false);
          const message = {
            message: 'Gagal mengirim laporan',
            variant: 'error',
            key: new Date().getTime()
          };
          showSnackBar(props.queueSnackBar, message, props.openSnackBar,
            props.onPushSnackBarsQueue, props.onShowHideSnackBars, props.messageSnackBar);
          // recaptchaRef.current.reset();
        });
    }
  }

  const handleSubmit = () => {
    const currentCharsLength = (255 - reportInputRef.current.length);
    if (currentCharsLength !== 255) {
      if (/\w+/.test(reportInputRef.current)) {
        const extractChars = reportInputRef.current.replace(/[^\w\s]/g, '');
        if (extractChars.length >= 10) {
          if (!reject) { // if reject not true or ''
            recaptchaRef.current.execute();
          }
        } else {
          setReject('Need a bit more words');
        }
      } else {
        setReject('&^%$*^#@!?');
      }
    } else {
      setReject('Cannot send empty report');
    }
  }

  return (
    <form className={classes.container} autoComplete="off">
      <ReportInput reject={reject} setReject={setReject} reportInputRef={reportInputRef} />
      <SubmitButton handleSubmit={handleSubmit} loading={loading} />
      {(props.rightTab === 4) ? (<ReCAPTCHA
        ref={recaptchaRef}
        className={classes.setHeight}
        size='invisible'
        badge='bottomright'
        // tabindex={4}
        theme={theme.palette.type}
        sitekey={process.env.REACT_APP_RECAPTCHA_KEY}
        onChange={handleChange}
      />) : null}
    </form>
  );
}

const mapStateToProps = state => {
  return {
    openSnackBar: state.snackBarsSetting.openSnackBar,
    queueSnackBar: state.snackBarsSetting.queueSnackBar,
    messageSnackBar: state.snackBarsSetting.messageSnackBar,
    rightTab: state.indexTab.rightTab
  }
}

const mapStateToDispatch = dispatch => {
  return {
    onShowHideSnackBars: (booLean, mess) => dispatch({
      type: OPENSNACKBARS,
      show: booLean,
      message: mess
    }),
    onPushSnackBarsQueue: (arRay) => dispatch({ type: PUSHTOQUEUE, queue: arRay })
  }
}

export default connect(mapStateToProps, mapStateToDispatch)(ReportForm);