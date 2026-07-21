import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles(theme => ({
    wrapper: {
        // alignSelf: 'center',
        display: 'flex',
        justifyContent: 'center',
        margin: theme.spacing(1, 2),
        position: 'relative',
    },
    buttonProgress: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: -12,
        marginLeft: -12,
    },
    setWidth: {
        width: '40%'
    }
}));

const SubmitButton = props => {
    const classes = useStyles();    

    return (
        <div className={classes.wrapper}>
            <Button
                className={classes.setWidth}
                onClick={props.handleSubmit}
                size='small'
                variant='contained'
                color='primary'
                // fullWidth
                disabled={props.loading} //(props.captchaValue ? false : true) && 
            >
                Submit
            </Button>
            {props.loading && <CircularProgress size={24} className={classes.buttonProgress} />}
        </div>
    );
}

export default SubmitButton;