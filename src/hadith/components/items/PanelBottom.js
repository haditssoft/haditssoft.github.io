import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import { withStyles, withTheme } from '@material-ui/core/styles';

import getPublisherName from '../../fungsi/getPublisherName';
import getKitabName from '../../fungsi/getKitabName';
import { setDispatchOtherNumber } from '../../sender/senderDataRequest';
import * as actionTypes from '../../store/action';
import PositionInput from './PositionInput';
import tableGradeName from '../../store/tableGradeName';
// import { currentSizeId } from '../../store/currentScreenSize';

const styles = theme => ({
    bottomPanel: {
        order: 4,
        display: 'flex',
        flexDirection: 'row',
        padding: '0 4px 0 4px',
        margin: '0 -3px',
        backgroundColor: theme.palette.type === 'dark' ? '#111111' : theme.palette.primary.main,
    },
    grow: {
        flexGrow: 1,
        textAlign: 'center',
    },
    verCentered: {
        lineHeight: '22px',
        color: theme.palette.primary.contrastText,
        marginRight: '5px',
    },
    marginMaxWidth: {
        maxWidth: '35%'
    }
});

class PanelBottom extends React.Component {

    shouldComponentUpdate(nextProps) {
        if (this.props.theme.palette.type !== nextProps.theme.palette.type) {
            return true;
        }
        if (nextProps.noLain !== this.props.noLain) {
            return true;
        } else if (nextProps.showInput !== this.props.showInput) {
            return true;
        } else if (nextProps.whatDataIsShown !== this.props.whatDataIsShown) {
            return true;
        } else if (getKitabName(nextProps.kitabName) !== getKitabName(this.props.kitabName)) {
            return true;
        };
        return false;
    };

    componentDidMount() {
        setDispatchOtherNumber(this.propsForOtherNumber);
        this.props.onSetAnchorNote(this.divComponent);
    };

    propsForOtherNumber = () => {
        return {
            noLain: this.props.noLain,
            onDispatchOtherNumber: this.props.onDispatchOtherNumber
        };
    }

    handleShowInput = () => {
        if (this.props.whatDataIsShown === 'MAINBOOKSDATA') {
            this.props.onShowInputOtherNumber(!this.props.showInput);
        };
    };

    render() {
        const { classes, kitabName, whatDataIsShown, narratorName, shownTable } = this.props;

        let whatIsShownInfo = '';
        switch (whatDataIsShown) {
            case 'MAINBOOKSDATA':
                whatIsShownInfo = 'Kitab Utama';
                break;
            case 'CLASSIFICATIONDATA':
                if (tableGradeName.includes(shownTable)) {
                    whatIsShownInfo = 'Berdasar Kedudukan';
                } else {
                    whatIsShownInfo = 'Hadits Tematis';
                }
                break;
            case 'BOOKMARKDATA':
                whatIsShownInfo = 'Bookmarks';
                break;
            case 'SEARCHDATA':
                whatIsShownInfo = 'Hasil Pencarian';
                break;
            case 'TOTALHADITHDATA':
                whatIsShownInfo = narratorName;
                break;
            case 'SIMILARDATA':
                whatIsShownInfo = 'Hadits Serupa';
                break;
            default:
                break;
        }

        let publisher = getPublisherName(kitabName);
        // if (currentSizeId === 'xs') {
        //     if (publisher.includes('Ad Dauliah')) {
        //         publisher = publisher.replace(' Ad Dauliah', '');
        //     } else if (publisher.includes('Muassasah')) {
        //         publisher = publisher.replace('Muassasah', 'M.');
        //     }
        // }

        let theOtherNumber = this.props.noLain;

        // Define if react should show other-number input
        let inputOtherNumber = null;
        let otherNumber = (
            <Typography className={classes.verCentered}
                onClick={this.handleShowInput}
                variant='caption'
                display='inline'
                style={whatDataIsShown === 'MAINBOOKSDATA' ? { cursor: 'pointer' } : null}>
                {theOtherNumber}
            </Typography>
        );
        if (this.props.showInput) { //
            inputOtherNumber = <PositionInput identity='PanelBottom' />;
            otherNumber = null;
        };

        return (
            <div ref={el => { this.divComponent = el }} className={classes.bottomPanel}>
                <Typography className={classes.verCentered}
                    style={{ marginLeft: '5px' }}
                    variant='caption'
                    display='inline'
                >
                    {publisher}
                </Typography>
                {inputOtherNumber}
                {otherNumber}
                <div className={classes.grow}></div>
                <Typography className={classes.verCentered + ' ' + classes.marginMaxWidth}
                    variant='caption'
                    display='inline'
                    noWrap={true}
                >
                    {whatIsShownInfo}
                </Typography>
            </div>
        );
    };
};

PanelBottom.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => {
    return {
        noLain: state.otherNumberData.noLain,
        showInput: state.otherNumberData.showInput,
        whatDataIsShown: state.mainBooksData.WhatDataIsShown,
        kitabName: state.mainBooksData.KitabName,
        narratorName: state.totalHadith.narratorName,
        shownTable: state.currentTable.shownTable,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onDispatchOtherNumber: (row) => dispatch({ type: actionTypes.OTHERNUMBER, noLain: row }),
        onShowInputOtherNumber: (booLean) => dispatch({ type: actionTypes.SHOWINPUTOTHERNUMBER, show: booLean }),
        onSetAnchorNote: (anch) => dispatch({ type: actionTypes.ANCHORNOTE, target: anch })
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(withTheme(PanelBottom)));
