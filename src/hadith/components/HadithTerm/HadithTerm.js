import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import Paper from '@material-ui/core/Paper';
import Draggable from 'react-draggable';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';

import HadithTermChild from './Child/HadithTermChild';
import { connect } from 'react-redux';
import { HADITHTERM } from '../../store/action';

function PaperComponent(props) {
    return (
        <Draggable
            cancel={'[class*="MuiDialogContent-root"]'}
            handle="#draggable-hadithterm-dialog"
            enableUserSelectHack={false}
        >
            <Paper {...props} />
        </Draggable>
    );
}

const HadithTerm = props => {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));
    const handleClose = () => {
        props.onShowHadithTerm(false);
    };
    return (
        <Dialog
            open={props.showHadithTerm}
            onClose={handleClose}
            PaperComponent={PaperComponent}
            fullWidth={true}
            maxWidth='sm'
            fullScreen={fullScreen}
            aria-labelledby="draggable-hadithterm-dialog"
        >
            <HadithTermChild open={props.onShowHadithTerm} />
        </Dialog>
    );
}

const mapStateToProps = state => {
    return {
        showHadithTerm: state.openHadithTerm.showHadithTerm
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onShowHadithTerm: (booLean) => dispatch({ type: HADITHTERM, open: booLean })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(HadithTerm));