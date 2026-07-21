import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import KeyboardIcon from '@material-ui/icons/Keyboard';

const useStyles = makeStyles(theme => ({
    iconButton: {
        padding: 10,
        },
    // ibColor: {
    //         color: theme.palette.type === 'dark' ? undefined : theme.palette.text.secondary
    //     }
}));

const KeyboardButton = props => {
    const classes = useStyles();

    const handleRef = React.useRef(props.handleKeyboardClick);

    React.useEffect(() => {
        handleRef.current = props.handleKeyboardClick;
    }, [props.handleKeyboardClick]);

    const keyboardIcon = React.useMemo(() => (
        <IconButton
            color="primary"
            className={classes.iconButton}
            aria-label="Keyboard"
            onClick={handleRef.current}
        >
            <KeyboardIcon />
        </IconButton>
    ), []);
    
    return keyboardIcon;
}

export default KeyboardButton;