import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';

const useStyles = makeStyles(theme => ({
    root: {
      margin: theme.spacing(.5, 0, 0, 0),
    },
}));

export default React.memo(function ArrowDownward() {
    const classes = useStyles();
    return <ArrowDownwardIcon classes={{ root: classes.root }} color='action' />;
});
