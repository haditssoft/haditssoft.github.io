import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';


const useStyles = makeStyles(theme => ({
  chip: {
    margin: theme.spacing(0, 0, 0, 1),
    cursor: 'pointer'
  },
}));

const HadithCount = props => {
  const classes = useStyles();
  return (<Chip
    size="small"
    label={props.label}
    onClick={props.clicked ? props.clicked(props.idnumber) : null}
    color='primary'
    variant='outlined'
    className={classes.chip}
  />);
}

export default React.memo(HadithCount);