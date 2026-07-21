import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';

import { connect } from 'react-redux';
import { HADITHTERM } from '../../store/action';

const useStyles = makeStyles(theme => ({
    leftIcon: {
        marginRight: theme.spacing(1),
        fontSize: 20,
    },
    setMargin: {
        marginBottom: theme.spacing(1)
    }
}));

const RankWrapper = props => {
    const classes = useStyles();

    const handleOpenHadithTerm = () => {
        props.onShowHadithTerm(true);
    }

    return (
        <>
            <Button
                className={classes.setMargin}
                variant='text'
                color='primary'
                onClick={handleOpenHadithTerm}
            >
                <HelpOutlineIcon className={classes.leftIcon} />
                Terminologi
            </Button>
            <Divider className={classes.setMargin} />
        </>
    );
}

const mapDispatchToProps = dispatch => {
    return {
        onShowHadithTerm: (booLean) => dispatch({ type: HADITHTERM, open: booLean })
    }
}

export default connect(null, mapDispatchToProps)(React.memo(RankWrapper, () => true));