import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles(theme => ({
    textField: {
        width: '-webkit-fill-available',
        display: 'flex',
        flexWrap: 'wrap',
        marginLeft: theme.spacing(3),
        marginRight: theme.spacing(3),
    },
}));

const PasswordConfirmInput = props => {
    const classes = useStyles();

    const handleChange = event => {
        props.setConfirmPasswordRef(event.target.value);
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
            id="outlined-password-confirm-input"
            label="Confirm Password"
            classes={{ root: classes.textField }}
            type="password"
            name="confirm-password"
            margin="normal"
            variant="outlined"
        />
    );
}

export default PasswordConfirmInput;
