import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
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
});
// mobile view
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
});

const NumberKeys = ({ clicked }) => {
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
      <Button onClick={clicked} variant="contained" color="primary" className={classes.button}>١</Button>
      <Button onClick={clicked} variant="contained" color="primary" className={classes.button}>٢</Button>
      <Button onClick={clicked} variant="contained" color="primary" className={classes.button}>٣</Button>
      <Button onClick={clicked} variant="contained" color="primary" className={classes.button}>٤</Button>
      <Button onClick={clicked} variant="contained" color="primary" className={classes.button}>٥</Button>
      <Button onClick={clicked} variant="contained" color="primary" className={classes.button}>٦</Button>
      <Button onClick={clicked} variant="contained" color="primary" className={classes.button}>٧</Button>
      <Button onClick={clicked} variant="contained" color="primary" className={classes.button}>٨</Button>
      <Button onClick={clicked} variant="contained" color="primary" className={classes.button}>٩</Button>
      <Button onClick={clicked} variant="contained" color="primary" className={classes.smallButton}>٠</Button>
    </React.Fragment>
  );
}

export default React.memo(NumberKeys);