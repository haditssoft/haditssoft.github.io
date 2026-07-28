import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import Slide from '@material-ui/core/Slide';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import ForgotPasswordForm from './ForgotPasswordForm';

const useStyles = makeStyles({
    firstChild: {
        width: '100%',
        '& > :first-child': {
            paddingTop: 6
        }
    }
});

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
});

const ForgotPassword = props => {
    const { open, onClose } = props;
    const classes = useStyles();
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));

    return (
        <Dialog
            PaperProps={{ className: classes.firstChild }}
            fullScreen={fullScreen}
            maxWidth='xs'
            open={open}
            onClose={onClose}
            aria-labelledby="forgot-password-dialog"
            TransitionComponent={Transition}
        >
            <ForgotPasswordForm onClose={onClose} />
        </Dialog>
    );
};

export default React.memo(ForgotPassword);
