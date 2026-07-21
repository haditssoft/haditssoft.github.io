import React from 'react';
// import clsx from 'clsx';
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

const EmailInput = props => {
    const classes = useStyles();

    const handleChange = (event) => {
        props.setEmailRef(event.target.value);
    }

    return (
        <TextField
            onChange={handleChange}
            id="outlined-email-input"
            label="Email"
            classes={{ root: classes.textField }}
            type="email"
            name="email"
            autoComplete="email"
            margin="normal"
            variant="outlined"
            autoFocus
            margin='normal'
        />
    );
}

export default React.memo(EmailInput);