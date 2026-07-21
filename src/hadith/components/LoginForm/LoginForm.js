import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import Slide from '@material-ui/core/Slide';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';

import FormComponent from './FormComponent';
import { connect } from 'react-redux';
import { GLOBALTHEME, LIGHTDARKSWITCH } from '../../store/action';
import { dark } from '../../fungsi/getTheme';
import { setCurrentTheme } from '../OptionSetting/AppSettings';
import { switchServer, authFetch } from '../../sender/api';

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

const LoginForm = props => {
    const { openExternal, handleCloseExternal } = props;
    const classes = useStyles();
    const [openDialog, setOpenDialog] = useState(false);
    const [startInVerifyMode, setStartInVerifyMode] = useState(false);

    useEffect(() => {
        if (openExternal !== undefined) {
            setOpenDialog(openExternal);
            return;
        }
        const handleForceLogout = () => setOpenDialog(true);
        const handleNeedVerification = () => {
            setStartInVerifyMode(true);
            setOpenDialog(true);
        };
        window.addEventListener('auth:logout', handleForceLogout);
        window.addEventListener('auth:needVerification', handleNeedVerification);

        const token = localStorage.getItem('token');
        if (!token) {
            setOpenDialog(true);
        } else {
            authFetch(switchServer + 'theme')
                .then(res => {
                    if (res.status !== 200) {
                        throw new Error('Failed to fetch theme setting.');
                    }
                    return res.json();
                })
                .then(resData => {
                    if (resData && (resData === 'd' || resData.theme === 'd')) {
                        setCurrentTheme(true);
                        const getTheme = dark();
                        props.onSetGlobalTheme(getTheme);
                        props.onSwitchTheme(true);
                    }
                })
                .catch(err => console.log('get theme local', err));
        }
        return () => {
            window.removeEventListener('auth:logout', handleForceLogout);
            window.removeEventListener('auth:needVerification', handleNeedVerification);
        };
    }, [props, openExternal]);

    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));

    function handleClose() {
        if (handleCloseExternal) {
            handleCloseExternal();
        } else {
            setOpenDialog(false);
        }
        setStartInVerifyMode(false);
    }

    return (
        <Dialog
            PaperProps={{ className: classes.firstChild }}
            fullScreen={fullScreen}
            maxWidth='xs'
            open={openDialog}
            onClose={handleClose}
            aria-labelledby="sign-in-dialog"
            TransitionComponent={Transition}
        >
            <FormComponent handleClose={handleClose} startInVerifyMode={startInVerifyMode} />
        </Dialog>
    );
}

const mapDispatchToProps = dispatch => {
    return {
        onSetGlobalTheme: (obj) => dispatch({ type: GLOBALTHEME, theme: obj }),
        onSwitchTheme: (booLean) => dispatch({ type: LIGHTDARKSWITCH, dark: booLean })
    };
};

export default connect(null, mapDispatchToProps)(React.memo(LoginForm));