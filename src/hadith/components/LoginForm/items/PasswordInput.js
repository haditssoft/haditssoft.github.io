import React from 'react';
// import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { withTranslation } from 'react-i18next';


const useStyles = makeStyles(theme => ({
    textField: {
        width: '-webkit-fill-available',
        display: 'flex',
        flexWrap: 'wrap',
        marginLeft: theme.spacing(3),
        marginRight: theme.spacing(3),
    },
}));

const PasswordInput = props => {
    const classes = useStyles();

    const handleChange = event => {
        props.setPasswordRef(event.target.value);
    }

    const handleEnterKey = event => {
        if (event.key === 'Enter') {
            props.handleSubmitSignUp();
        }
    }

    return (
        <TextField
            onChange={handleChange}
            onKeyPress={handleEnterKey}
            id="outlined-password-input"
            label={props.t('loginForm.password')}
            classes={{ root: classes.textField }}
            type="password"
            name="password"
            margin="normal"
            variant="outlined"
            margin='normal'
        />
    );
}

export default withTranslation()(PasswordInput);