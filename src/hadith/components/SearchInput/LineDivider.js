import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';


const useStyles = makeStyles({
    divider: {
        width: 1,
        height: '65%',
        margin: 4,
      },
});

const LineDivider = () => {
    const classes = useStyles();

    const divider = React.useMemo(() => <Divider className={classes.divider} />, []);
    
    return divider;
}

export default LineDivider;