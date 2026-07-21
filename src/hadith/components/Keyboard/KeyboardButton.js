import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import NumberKeys from './NumberKeys';
import SpaceAndOtherKeys from './SpaceAndOtherKeys';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';

const useStyles = makeStyles({
  button: {
    margin: 2,
    padding: 0,
    minWidth: 28,
    minHeight: 28,
    fontSize: '1rem',
  },
  smallButton: {
    margin: 2,
    padding: 0,
    minWidth: 44,
    minHeight: 28,
    fontSize: '1rem',
  },
  medButton: {
    margin: 2,
    padding: 0,
    minWidth: 60,
    minHeight: 28,
    fontSize: '1rem',
  },
  setPadding: {
    padding: '0 4px',
  },
});
// Mobile View
const useSmallStyles = makeStyles({
  button: {
    borderWidth: 'thin',
    borderStyle: 'solid',
    borderColor: 'white',
    padding: 0,
    fontSize: '1rem',
    minWidth: 28,
    minHeight: 28
  },
  smallButton: {
    borderWidth: 'thin',
    borderStyle: 'solid',
    borderColor: 'white',
    padding: 0,
    fontSize: '1rem',
    minWidth: 42,
    minHeight: 28
  },
  medButton: {
    padding: 0,
    borderWidth: 'thin',
    borderStyle: 'solid',
    borderColor: 'white',
    fontSize: '1rem',
    minWidth: 56,
    minHeight: 28
  },
  setPadding: {
    // padding: '0 4px',
  },
});

function ContainedButtons(props) {
  const { clicked, shifted } = props;
  const theme = useTheme();
  const isWindowSmall = useMediaQuery(theme.breakpoints.down('xs'));
  const normalClasses = useStyles();
  const smallClasses = useSmallStyles();
  let classes;
  if (isWindowSmall) {
    classes = smallClasses;
  } else {
    classes = normalClasses;
  }
  return (
    <React.Fragment>
      <div className={classes.setPadding}>
        <Button onClick={clicked} variant="contained" color="primary" className={classes.smallButton}>{shifted ? '\u0651' : 'ذ'}</Button>
        <NumberKeys clicked={clicked} />
      </div>
      <div className={classes.setPadding}>
        <Button onClick={clicked} variant="contained" color="primary" className={classes.button}>{shifted ? '\u064E' : 'ض'}</Button>
        <Button onClick={clicked} variant="contained" color="primary" className={classes.button}>{shifted ? '\u064B' : 'ص'}</Button>
        <Button onClick={clicked} variant="contained" color="primary" className={classes.button}>{shifted ? '\u064F' : 'ث'}</Button>
        <Button onClick={clicked} variant="contained" color="primary" className={classes.button}>{shifted ? '\u064C' : 'ق'}</Button>
        <Button onClick={clicked} variant="contained" color="primary" className={classes.button}>{shifted ? 'لإ' : 'ف'}</Button>
        <Button onClick={clicked} variant="contained" color="primary" className={classes.button}>{shifted ? '\u0625' : 'غ'}</Button>
        <Button onClick={clicked} variant="contained" color="primary" className={classes.button} disabled={shifted}>ع</Button>
        <Button onClick={clicked} variant="contained" color="primary" className={classes.button} disabled={shifted}>ه</Button>
        <Button onClick={clicked} variant="contained" color="primary" className={classes.button} disabled={shifted}>خ</Button>
        <Button onClick={clicked} variant="contained" color="primary" className={classes.button} disabled={shifted}>ح</Button>
        <Button onClick={clicked} variant="contained" color="primary" className={classes.button} disabled={shifted}>ج</Button>
        <Button onClick={clicked} variant="contained" color="primary" className={classes.button} disabled={shifted}>د</Button>
      </div>
      <div className={classes.setPadding}>
        <Button onClick={clicked} variant="contained" color="primary" className={classes.smallButton}>{shifted ? '\u0650' : 'ش'}</Button>
        <Button onClick={clicked} variant="contained" color="primary" className={classes.button}>{shifted ? '\u064D' : 'س'}</Button>
        <Button onClick={clicked} variant="contained" color="primary" className={classes.button} disabled={shifted}>ي</Button>
        <Button onClick={clicked} variant="contained" color="primary" className={classes.button} disabled={shifted}>ب</Button>
        <Button onClick={clicked} variant="contained" color="primary" className={classes.button}>{shifted ? 'لأ' : 'ل'}</Button>
        <Button onClick={clicked} variant="contained" color="primary" className={classes.button}>{shifted ? '\u0623' : 'ا'}</Button>
        <Button onClick={clicked} variant="contained" color="primary" className={classes.button} disabled={shifted}>ت</Button>
        <Button onClick={clicked} variant="contained" color="primary" className={classes.button} disabled={shifted}>ن</Button>
        <Button onClick={clicked} variant="contained" color="primary" className={classes.button} disabled={shifted}>م</Button>
        <Button onClick={clicked} variant="contained" color="primary" className={classes.button} disabled={shifted}>ك</Button>
        <Button onClick={clicked} variant="contained" color="primary" className={classes.smallButton} disabled={shifted}>ط</Button>
      </div>
      <div className={classes.setPadding}>
        <Button onClick={clicked} variant="contained" color="primary" className={classes.medButton}>{shifted ? '~' : 'ئ'}</Button>
        <Button onClick={clicked} variant="contained" color="primary" className={classes.button}>{shifted ? '\u0652' : 'ء'}</Button>
        <Button onClick={clicked} variant="contained" color="primary" className={classes.button} disabled={shifted}>ؤ</Button>
        <Button onClick={clicked} variant="contained" color="primary" className={classes.button} disabled={shifted}>ر</Button>
        <Button onClick={clicked} variant="contained" color="primary" className={classes.button}>{shifted ? 'لآ' : 'لا'}</Button>
        <Button onClick={clicked} variant="contained" color="primary" className={classes.button}>{shifted ? '\u0622' : 'ى'}</Button>
        <Button onClick={clicked} variant="contained" color="primary" className={classes.button} disabled={shifted}>ة</Button>
        <Button onClick={clicked} variant="contained" color="primary" className={classes.button} disabled={shifted}>و</Button>
        <Button onClick={clicked} variant="contained" color="primary" className={classes.button} disabled={shifted}>ز</Button>
        <Button onClick={clicked} variant="contained" color="primary" className={classes.medButton} disabled={shifted}>ظ</Button>
      </div>
      <SpaceAndOtherKeys clicked={clicked} />
    </React.Fragment>
  );
};

export default React.memo(ContainedButtons);
