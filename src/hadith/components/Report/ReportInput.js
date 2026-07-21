import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles(theme => ({
    textField: {
        // width: '85%',
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(2)
        // width: 200,
    }
}));

export default function ReportInput(props) {
    const classes = useStyles();
    const [values, setValues] = React.useState('');

    useEffect(() => {
        props.reportInputRef.current = values;
    });

    const handleChange = event => {
        setValues(event.target.value);
        const currentCharsLength = (255 - event.target.value.length);
        if (currentCharsLength < 241) {
            if (currentCharsLength >= 0) {
                props.setReject(false);
            } else {
                props.setReject('Please remove some characters');
            }
        } else {
            props.setReject('Keep typing...');
        }
    };

    const handleFocus = () => {
        if (!values) {
            props.setReject(true);            
        }
    }

    const handleBlur = () => {
        if (!values) {
            props.setReject(false);
        }
    }

    return (
        <TextField
            id='report-input'
            label='Report'
            multiline
            rows='4'
            variant='outlined'
            helperText={(props.reject && typeof props.reject === 'string') ? props.reject : ('Chars remains: ' + (255 - values.length))}
            value={values}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            className={classes.textField}
            margin='none'
            FormHelperTextProps={{ error: props.reject ? true : false }}
        />
    );
}
