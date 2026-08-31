import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { withTranslation } from 'react-i18next';

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

export default withTranslation()(function ReportInput(props) {
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
                props.setReject(props.t('report.removeChars'));
            }
        } else {
            props.setReject(props.t('report.keepTyping'));
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
            label={props.t('report.report')}
            multiline
            rows='4'
            variant='outlined'
            helperText={(props.reject && typeof props.reject === 'string') ? props.reject : (props.t('report.charsRemaining') + (255 - values.length))}
            value={values}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            className={classes.textField}
            margin='none'
            FormHelperTextProps={{ error: props.reject ? true : false }}
        />
    );
});
