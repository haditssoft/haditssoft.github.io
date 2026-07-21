import React from 'react';
import { withStyles, withTheme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

import { connect } from 'react-redux';
import {
    MAINBOOKSDATA,
    CLASSIFICATIONDATA,
    BOOKMARKDATA,
    SEARCHDATA,
    TOTALHADITHDATA,
    CHANGENUMBER,
    OTHERNUMBERTOSEARCH,
    SHOWINPUTOTHERNUMBER,
    SIMILARDATA,
    SELECTEDSIMILAR,
} from '../../store/action';
import sender from '../../sender/senderDataRequest';
import { getMainTable_Kedudukan } from '../../fungsi/getTableName';
import { getCompactImamName } from '../../fungsi/getImamName';
import getKitabName from '../../fungsi/getKitabName';
import getCompleteKitabName from '../../fungsi/getCompleteKitabName';
import { getCompactClassName } from '../../fungsi/getClassificationName';
import arrayOfKitabsName from '../../store/arrayOfKitabsName';

import { withRouter } from "react-router";

const styles = theme => ({
    container: {
        display: 'inline-flex',
        flexWrap: 'wrap',
        flex: '0 0 auto',
    },
    textField: {
        marginRight: theme.spacing(1),
    },
    cssUnderlineAppBar: {
        '&:after': {
            borderBottomColor: 'white',
        },
        '&:before': {
            borderBottomColor: 'white',
        },
    },
    cssUnderlineGrid: {
        fontSize: '0.875rem',
        '&:after': {
            borderBottomColor: theme.palette.primary.main,
        },
        '&:before': {
            borderBottomColor: 'white',
        },
    },
    setFontInput: {
        margin: 'auto',
        ...theme.typography.caption
    },
});

const inputProps = (parent) => {
    return {
        style: {
            padding: 0,
            color: parent === 'grid' ? undefined : '#fff',
            textAlign: 'inherit',
        }
    };
}

// will be used in senderDataRequest.js to set blur on positioninput
export let posInputRef = React.createRef();

class PositionInput extends React.Component {

    shouldComponentUpdate(nextProps) {
        if (this.props.theme.palette.type !== nextProps.theme.palette.type) {
            return true;
        }
        if (this.props.identity === 'AppBar') {
            if (this.props.changePosition === nextProps.changePosition) {
                return false;
            } else {
                return true;
            }
        } else if (this.props.identity === 'PanelBottom') {
            if (this.props.numberToSearch === nextProps.numberToSearch) {
                return false;
            } else {
                return true;
            }
        }
    }

    componentDidUpdate() {
        if (this.props.identity === 'AppBar') {
            let targetUrl;
            switch (this.props.whatDataIsShown) {
                case MAINBOOKSDATA:
                    targetUrl = `/main/${getCompactImamName(this.props.shownTable)}/${+this.props.position}`;
                    // ditambah pengecekan seperti ini karena dibeberapa kondisi
                    // url juga diset di GridBraekPoint.js, sehingga history stack 
                    // tidak bertumpuk dengan url yg sama
                    if (this.props.location.pathname !== targetUrl) {
                        this.props.history.push(targetUrl);
                    }
                    break;
                case CLASSIFICATIONDATA:
                    const mainKitab = getMainTable_Kedudukan(+this.props.position, this.props.shownTable);
                    targetUrl = `/class/${getCompactClassName(this.props.shownTable)}/${getCompactImamName(mainKitab)}/${+this.props.position}`;
                    if (this.props.location.pathname !== targetUrl) {
                        this.props.history.push(targetUrl);
                    }
                    break;
                case BOOKMARKDATA:
                    // ga tau kenapa Mainbooksdata dan classification set url di componentDidUpdate ini
                    // padahal sudah dihandle di NavComponent.js pada fungsi handleFirstLastHadits dan 
                    // handlePrevNextHadits, oleh karena itu yg bookmark ini saya comment dulu
                    // const posIndex = +this.props.position - 1;
                    // const kitab_n_number = this.props.bookmarkList[posIndex];
                    // targetUrl = `/bookmark/${this.props.shownTable}/${+this.props.position}/${getCompactImamName(kitab_n_number.book)}/${kitab_n_number.no}`;
                    // if (this.props.location.pathname !== targetUrl) {
                    //     this.props.history.push(targetUrl);
                    // }
                    break;
                case SEARCHDATA:
                    break;
                case TOTALHADITHDATA:
                    break;
                case SIMILARDATA:
                    break;
                default:
                    break;
            }
        }
    }

    handleChange = event => {
        // handle if hadits haven't loaded yet
        if (this.props.whatDataIsShown !== '') {
            // If the value neither '' nor digit-only then don't send it to reducer/state
            const digit = /^[0-9\b]+$/; // /[\d+]/g
            if (event.target.value === '' || digit.test(event.target.value)) {
                if (this.props.identity === 'AppBar') {
                    // Input Position Has Changed
                    this.props.onNumberChanged(event.target.value);
                } else {
                    // Input Other Number Has Changed
                    this.props.onOtherNumberChanged(event.target.value);
                }
            }
        }
    }

    handleLostFocus = () => {
        if (this.props.identity === 'AppBar') {
            if (this.props.changePosition !== this.props.position) {
                this.props.onNumberChanged(this.props.position);
            }
        } else {
            this.props.onShowInputOtherNumber(!this.props.showInput);
        }
    };

    handleEnterKey = event => {
        if (event.key === 'Enter') {
            event.preventDefault();

            // Navigate through number from AppBar
            if (this.props.identity === 'AppBar') {
                // If the position is already it meant to be, then terminate the process
                if (+event.target.value !== this.props.position && event.target.value !== '') {
                    // Checking for what type of data is currently being shown (i.e. MainBooks, etc.)
                    switch (this.props.whatDataIsShown) {
                        case MAINBOOKSDATA:
                            return sender('loadMainData', [this.props.shownTable, +event.target.value]);
                        case CLASSIFICATIONDATA:
                            const mainKitab = getMainTable_Kedudukan(+event.target.value, this.props.shownTable);
                            this.props.history.push(`/class/${getCompactClassName(this.props.shownTable)}/${getCompactImamName(mainKitab)}/${+event.target.value}`);
                            // Inside array example > [ShahihBukhari, KumpulanAlQuran, 5]
                            return sender('classificationData', [mainKitab, +event.target.value, this.props.shownTable]);
                        case BOOKMARKDATA:
                            const targetPosition = +event.target.value - 1;
                            const arrayOfObject = this.props.bookmarkList;
                            this.props.history.push(`/bookmark/${this.props.shownTable}/${event.target.value}/${getCompactImamName(arrayOfObject[targetPosition].book)}/${arrayOfObject[targetPosition].no}`);
                            // Inside array example > [ShahihBukhari, 5, 1]
                            sender('loadCustomData',
                                [arrayOfObject[targetPosition].book,
                                arrayOfObject[targetPosition].no,
                                +event.target.value,
                                    BOOKMARKDATA]);
                            break;
                        case SEARCHDATA:
                            const targetPositionS = +event.target.value - 1;
                            const keyOfNum = Object.keys(this.props.searchResult[targetPositionS])[0];
                            const numToKitabName = arrayOfKitabsName[keyOfNum];
                            // Inside array example > [ShahihBukhari, 5, 1]
                            sender('loadCustomData',
                                [numToKitabName,
                                Object.values(this.props.searchResult[targetPositionS])[0],
                                +event.target.value,
                                    SEARCHDATA]);

                            const queryParams = new URLSearchParams(this.props.location.search);
                            const query = queryParams.get('query');
                            const mode = queryParams.get('mode');
                            const books = queryParams.get('books');
                            this.props.history.push(`/search?query=${query}&mode=${mode}&books=${books}&no=${+event.target.value}`);
                            
                            break;
                        case TOTALHADITHDATA:
                            const targetPositionX = +event.target.value - 1;
                            // Inside array example > [ShahihBukhari, 5, 1]
                            sender('loadCustomData',
                                [getKitabName(this.props.kitabName),
                                Object.values(this.props.totalNarrated[targetPositionX])[0],
                                +event.target.value,
                                    TOTALHADITHDATA]);
                            break;
                        case SIMILARDATA:
                            const targetPositionZ = +event.target.value - 1;
                            // example: {Nama: "Bukhari", NoBanding: 52}
                            const oneObjOfSimilarHadits = this.props.similarData[targetPositionZ];
                            const completeKitabName = getCompleteKitabName(oneObjOfSimilarHadits['Nama']);
                            const hadithNumber = oneObjOfSimilarHadits['NoBanding'];
                            sender('loadCustomData',
                                [completeKitabName,
                                    hadithNumber,
                                    +event.target.value,
                                    SIMILARDATA]);
                            this.props.onSelectSimilar(oneObjOfSimilarHadits['Nama'] + hadithNumber);
                            break;
                        default:
                            break;
                    }
                }
            } else {
                // check if the number to be search arleady exist in array of other-number
                // if it is, return index number, otherwise return -1
                const alreadyInPosition = Object.values(this.props.noLain[0] || {}).indexOf(+event.target.value);
                // if alreadyInPosition === -1 it's mean the current position is not already it mean to be
                if (alreadyInPosition === -1 && event.target.value !== '') {
                    sender('searchNoLain', [this.props.shownTable, event.target.value]);
                }
            }
        }
    }

    render() {
        const { classes, identity, numberToSearch, changePosition } = this.props;

        // These initial value are for input other number
        let preText = 'Nomer...';
        let preValue = numberToSearch;
        let autoFocus = true;
        let fontOrUnderLine = { root: classes.setFontInput };
        let disableUnderline = true;
        let textFieldWwidth = 70;
        let textFieldMarginLeft = 0;
        // If it's necessary change the value for input position
        if (identity === 'AppBar') {
            let underLineStyle, textInputPosWidth;
            if (this.props.inputStyles === 'appbar') {
                underLineStyle = classes.cssUnderlineAppBar;
                textInputPosWidth = 86;
            } else {
                underLineStyle = classes.cssUnderlineGrid;
                textInputPosWidth = 65;
            }
            preValue = changePosition;
            preText = '';
            autoFocus = false;
            fontOrUnderLine = { underline: underLineStyle };
            disableUnderline = false;
            textFieldWwidth = textInputPosWidth;
            textFieldMarginLeft = 8;
        };

        return (
            <form className={classes.container} style={{ width: textFieldWwidth }} noValidate autoComplete="off">
                <TextField
                    autoFocus={autoFocus}
                    placeholder={preText}
                    value={preValue}
                    onChange={this.handleChange}
                    onKeyPress={this.handleEnterKey}
                    onBlur={this.handleLostFocus}
                    style={{ marginLeft: textFieldMarginLeft }}
                    className={classes.textField}
                    inputRef={posInputRef}
                    inputProps={inputProps(this.props.inputStyles)}
                    InputProps={{
                        classes: {
                            ...fontOrUnderLine,
                        },
                        disableUnderline: disableUnderline
                    }}
                />
            </form>
        );
    };
};

const mapStateToProps = state => {
    return {
        kitabName: state.mainBooksData.KitabName,
        position: state.mainBooksData.Position,
        whatDataIsShown: state.mainBooksData.WhatDataIsShown,
        changePosition: state.mainBooksData.changePosition,
        numberToSearch: state.otherNumberData.numberToSearch,
        noLain: state.otherNumberData.noLain,
        showInput: state.otherNumberData.showInput,
        shownTable: state.currentTable.shownTable,
        bookmarkList: state.bookmarkContent.bookmarkList,
        searchResult: state.searchResult.searchResult,
        totalNarrated: state.totalHadith.totalNarrated,
        similarData: state.similar.similarData,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onNumberChanged: (pos) => dispatch({ type: CHANGENUMBER, position: pos }),
        onOtherNumberChanged: (pos) => dispatch({ type: OTHERNUMBERTOSEARCH, position: pos }),
        onShowInputOtherNumber: (booLean) => dispatch({ type: SHOWINPUTOTHERNUMBER, show: booLean }),
        onSelectSimilar: (str) => dispatch({ type: SELECTEDSIMILAR, select: str }),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(withTheme(withRouter(PositionInput))));
