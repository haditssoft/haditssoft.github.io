import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
    forPaddingSet: {
        padding: '10px 20px 50px',
        [theme.breakpoints.down('xs')]: {
            // fontStyle: 'oblique',
            fontSize: '0.75rem'
        }
    }
}));

const Grade = ({ grade, ijma }) => {
    const classes = useStyles();

    return (
        <Typography
            className={classes.forPaddingSet}
            color='textSecondary'
            variant='subtitle2'
        >
            {/* If it is shahihain being shown then set the grade to 'Shahih' by ijma ulama
            else get the grade from state/database */}
            {ijma ? ijma : grade}
        </Typography>
    );
};

export default React.memo(Grade);