import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { withTranslation } from 'react-i18next';

const useStyles = makeStyles(theme => ({
    button: {
        margin: theme.spacing(1, 2),
        width: 'inherit'
    },
}));

const SignInButton = props => {
    const classes = useStyles();

    return (
        <Button onClick={props.handleSubmitSignUp} variant='contained' color="primary" className={classes.button}>
            {props.t('loginForm.signIn')}
        </Button>
    );
}

export default withTranslation()(SignInButton);