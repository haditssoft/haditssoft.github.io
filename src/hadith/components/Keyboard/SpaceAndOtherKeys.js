import React from 'react';
import { withTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';

const useStyles = makeStyles({
    largeButton: {
        margin: 2,
        padding: 0,
        minWidth: 78,
        minHeight: 28,
        fontSize: '1rem',
    },
    xLargebutton: {
        margin: 2,
        padding: 0,
        minWidth: 216,
        minHeight: 28,
        fontSize: '1rem',
    },
    setPadding: {
        padding: '0 4px',
    },
});
// mobile view
const useSmallStyles = makeStyles({
    largeButton: {
        padding: 0,
        minHeight: 28,
    },
    xLargebutton: {
        padding: 0,
        minHeight: 28,
    },
    setPadding: {
        display: 'flex',
        justifyContent: 'space-around'
    },
});

const SpaceAndOtherKeys = ({ clicked, t }) => {
    const theme = useTheme();
    const isWindowSmall = useMediaQuery(theme.breakpoints.down('xs'));
    const normalClasses = useStyles();
    const smallClasses = useSmallStyles();
    let classes;
    if (isWindowSmall) {
        classes = smallClasses;
    } else {
        classes = normalClasses;
    }
    return (
        <div className={classes.setPadding}>
            <Button onClick={clicked} variant="text" color="primary" className={classes.largeButton}>{t('keyboard.shift')}</Button>
            <Button onClick={clicked} variant="text" color="primary" className={classes.xLargebutton}>{t('keyboard.space')}</Button>
            <Button onClick={clicked} variant="text" color="primary" className={classes.largeButton}>{t('keyboard.delete')}</Button>
        </div>
    );
}

export default withTranslation()(React.memo(SpaceAndOtherKeys));