import React from 'react';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import { withStyles, withTheme } from '@material-ui/core/styles';
import OutlinedInput from '@material-ui/core/OutlinedInput';

import { connect } from 'react-redux';
import * as actionTypes from '../../store/action';
import { isSizeSmall } from '../../store/currentScreenSize';
import sender from '../../sender/senderDataRequest';
import getKitabName from '../../fungsi/getKitabName';

const styles = theme => ({
    formControl: {
        margin: theme.spacing(1),
    },
    labelColor: {
        color: theme.palette.type === 'dark' ? '#00AEDB' : null,
        [theme.breakpoints.down('xs')]: {
            top: '-8px'
        }
    },
    setTopWhenShrink: {
        top: 0
    },
    showHorScroll: {
        width: '100%',
        overflowX: 'auto',
        backgroundColor: theme.palette.type === 'light' ? theme.palette.background.paper : '#222222'
    },
    setTheWidth: {
        minWidth: '100%',
        width: 'fit-content !important'
    },
    setPadTopBottom: {
        [theme.breakpoints.down('xs')]: {
            paddingTop: 13,
            paddingBottom: 10
        }
    },
    setFontSize: {
        [theme.breakpoints.down('xs')]: {
            fontSize: '0.875rem'
        }
    }
});

class KitabAndBab extends React.Component {
    state = {
        labelWidth: 0,
        autoFocusItem: true
    };

    inputLabelRef = React.createRef();

    shouldComponentUpdate(nextProps, nextState) {
        if (this.props.theme.palette.type !== nextProps.theme.palette.type) {
            return true;
        }
        if (this.props.itemContent.length !== 0 && nextProps.itemContent.length === 0) {
            // to handle clearMainData, KitabData, BabData, OtherNumberData
            // when delete a bookmark which is shown
            return true;
        } else if (nextProps.value === '') {
            return false;
        } else if (nextProps.openComboKitab !== this.props.openComboKitab) {
            return true;
        } else if (nextProps.openComboBab !== this.props.openComboBab) {
            return true;
        } else if (nextState.autoFocusItem && nextState.autoFocusItem !== this.state.autoFocusItem) {
            return true;
        } else {
            if (nextProps.value != this.props.value) {
                return true;
            } else {
                const nextItem = nextProps.itemContent.map(obj => obj.props.children).join('');
                const nowItem = this.props.itemContent.map(obj => obj.props.children).join('');
                if (nextItem !== nowItem) {
                    return true;
                } else {
                    return false;
                }
            }
        }
    };

    componentDidUpdate() {
        if (this.props.whatDataIsShown === actionTypes.MAINBOOKSDATA) {
            if (this.props.identity === 'Kitab') {
                if (this.props.openComboKitab) {
                    if (this.props.kitab.length < 2) {
                        const bookName = getKitabName(this.props.kitabName);
                        sender('loadAllBooks', [bookName]);
                    } else {
                        // enter here means either after all book have been received from server
                        // or just another opening select component
                        if (!this.state.autoFocusItem) {
                            this.setState({ autoFocusItem: true });
                        }
                    }
                }
            } else {
                if (this.props.openComboBab) {
                    if (this.props.bab.length < 2) {
                        const bookName = getKitabName(this.props.kitabName);
                        let start, end;
                        if (this.props.kitab.length === 1) {
                            start = this.props.kitab[0].Awalan;
                            // enter here means there is no way to get the end value (the Awalan value of the next books title),
                            // so needs to get it first by providing this.props.vSelectedK value
                            // which will be increase by 1 in the back-end to target the next books title row
                            // cannot use this.props.value because it hold value of props.shownBab which is this.props.vSelectedB
                            end = this.props.vSelectedK;
                            sender('loadAllChapters/endfirst', [bookName, start, end]);
                        } else if (this.props.kitab.length > 1) {
                            start = (+this.props.vSelectedK !== 0) ? this.props.kitab[+this.props.vSelectedK - 1].Awalan : 0;
                            end = this.props.kitab[+this.props.vSelectedK] === undefined ? 26363 : this.props.kitab[+this.props.vSelectedK].Awalan;
                            sender('loadAllChapters', [bookName, start, end]);
                        }
                    } else {
                        // enter here means either after all chapters of coresponding book have been received from server
                        // or just subsequent opens of select component
                        if (!this.state.autoFocusItem) {
                            this.setState({ autoFocusItem: true });
                        }
                    }
                }
            }
        }
    }

    componentDidMount() {
        this.setState({
            labelWidth: this.inputLabelRef.current.offsetWidth,
        });
    };

    handleOpen = () => {
        if (this.props.identity === 'Kitab') {
            if (this.props.kitab.length < 2) {
                // will be set to true after data from server have been received
                // so that menu will displaying the selected item
                this.setState({ autoFocusItem: false });
            }
            this.props.onControlingKitab(true);
        } else {
            if (this.props.bab.length < 2) {
                // will be set to true after data from server have been received
                // so that menu will displaying the selected item
                this.setState({ autoFocusItem: false });
            }
            this.props.onControlingBab(true);
        }
    };

    handleClose = () => {
        if (this.props.identity === 'Kitab') {
            this.props.onControlingKitab(false);
        } else {
            this.props.onControlingBab(false);
        }
    };

    render() {
        const { classes, identity, openComboKitab, openComboBab } = this.props;

        return (
            <FormControl key={this.props.id} fullWidth={true} variant="outlined" className={classes.formControl}>
                <InputLabel
                    ref={this.inputLabelRef}
                    htmlFor={this.props.id}
                    classes={{ root: classes.labelColor, shrink: classes.setTopWhenShrink }}
                >
                    {identity}
                </InputLabel>
                <Select
                    classes={{ root: classes.setPadTopBottom }}
                    open={identity === 'Kitab' ? openComboKitab : openComboBab}
                    onOpen={this.handleOpen}
                    onClose={this.handleClose}
                    value={this.props.value}
                    onChange={this.props.changed}
                    input={
                        <OutlinedInput
                            className={classes.setFontSize}
                            labelWidth={this.state.labelWidth}
                            name={this.props.name}
                            id={this.props.id}
                        />
                    }
                    MenuProps={isSizeSmall ? {
                        autoFocus: this.state.autoFocusItem,
                        classes: { list: classes.setTheWidth, paper: classes.showHorScroll }
                    } : {
                            anchorOrigin: {
                                vertical: "top",
                                horizontal: "left"
                            },
                            transformOrigin: {
                                vertical: "top",
                                horizontal: "left"
                            },
                            getContentAnchorEl: null,
                            autoFocus: this.state.autoFocusItem,
                            classes: { list: classes.setTheWidth, paper: classes.showHorScroll },
                            style: {
                                maxWidth: this.inputLabelRef.current ?
                                    this.inputLabelRef.current.nextElementSibling.clientWidth + 25 :
                                    '',
                            },
                        }}
                >
                    {this.props.itemContent}
                </Select>
            </FormControl>
        );
    };
};

const mapStateToProps = state => {
    return {
        whatDataIsShown: state.mainBooksData.WhatDataIsShown,
        kitabName: state.mainBooksData.KitabName,
        vSelectedK: state.mainBooksData.VSelectedK,
        openComboKitab: state.openAndClose.openComboKitab,
        openComboBab: state.openAndClose.openComboBab
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onControlingKitab: (booLean) => dispatch({ type: actionTypes.OPENCOMBOKITAB, open: booLean }),
        onControlingBab: (booLean) => dispatch({ type: actionTypes.OPENCOMBOBAB, open: booLean })
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(withTheme(KitabAndBab)));