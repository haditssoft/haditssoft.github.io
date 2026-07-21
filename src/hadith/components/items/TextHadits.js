import React from 'react';
import clsx from 'clsx';
import { withStyles, withTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Skeleton from '@material-ui/lab/Skeleton';

import SwipeableViews from 'react-swipeable-views';
import { virtualize, bindKeyboard } from 'react-swipeable-views-utils';
// import { mod } from 'react-swipeable-views-core';

import { connect } from 'react-redux';
import replaceBraces from '../../fungsi/replaceBraces';
import coloringFoundText from '../../fungsi/coloringFoundText';
import {
    SHOWINPUTOTHERNUMBER,
    SETARABICFONT,
    SETINDOFONT,
    SHOWPROFILE,
    SHOWDETAILSCOLOR,
    SEARCHDATA,
    // KITABANDBAB,
    // SWIPEABLEINDEX
} from '../../store/action';
import { keyWords, columnName } from '../../store/searchKeywords';
import { currentSizeId } from '../../store/currentScreenSize';
import { expHandlePrevNextHadits } from '../NavComponent/NavComponent';
// import { expDispatchMainData } from '../../sender/senderDataRequest';
import { switchServer, authFetch } from '../../sender/api';


const VirtualizeSwipeableViews = bindKeyboard(virtualize(SwipeableViews));

const styles = theme => ({
    toFlex: {
        order: 1,
        display: 'flex',
        flexDirection: 'row',
        // flex: '1 1 76%',
        height: '100%',
        [theme.breakpoints.down('xs')]: {
            flexDirection: 'column'
        }
    },
    accordingToTheme: {
        color: theme.palette.type === 'dark' ? theme.palette.text.secondary : theme.palette.text.primary,
        lineHeight: theme.typography.subtitle1.lineHeight
    },
    arabicFontStyle: props => ({
        fontFamily: `${props.arabicFont[0]}, ${props.arabicFont[1]}`,
        fontWeight: props.arabicFont[2],
        fontSize: props.arabicFont[3]
    }),
    indoFontStyle: props => ({
        fontFamily: `${props.indoFont[0]}, ${props.indoFont[1]}`,
        fontWeight: props.indoFont[2],
        fontSize: props.indoFont[3],
        letterSpacing: theme.typography.caption.letterSpacing
    }),
    centeringSkeleton: {
        marginLeft: 'auto',
        marginRight: 'auto'
    },
    skeletonWrapperFlex: {
        flex: '1 1 auto'
    },
    firstParagraph: {
        marginLeft: '10%',
        // marginRight: '10%'
    },
    lastLine: {
        marginLeft: '10%'
    }
});

let textAhadith = ([classes, coloredArabic, coloredIndo, handleTextHadithClicked, key]) => (
    <div key={key} className={classes.toFlex} onClick={handleTextHadithClicked}>
        <div className='divOuter delayedScroll dirAndFontArab'>
            <div className='showScroll kiriKanan'>
                <Typography
                    className={clsx(classes.accordingToTheme, classes.arabicFontStyle)}
                >
                    {coloredArabic} {/* Text hadits */}
                </Typography>
            </div>
        </div>
        <div className='divOuter delayedScroll dirAndFontIndo'>
            <div className='showScroll kananKiri'>
                <Typography
                    className={clsx(classes.accordingToTheme, classes.indoFontStyle)}
                >
                    {coloredIndo} {/* Text hadits */}
                </Typography>
            </div>
        </div>
    </div>
);

const skeletonItem = (classes, disableAnimate) => (
    <div className={classes.skeletonWrapperFlex}>
        <Skeleton disableAnimate={disableAnimate} className={classes.firstParagraph} height={10} width="80%" />
        <Skeleton disableAnimate={disableAnimate} className={classes.centeringSkeleton} height={10} width="80%" />
        <Skeleton disableAnimate={disableAnimate} className={classes.centeringSkeleton} height={10} width="80%" />
        <Skeleton disableAnimate={disableAnimate} className={classes.centeringSkeleton} height={10} width="80%" />
        <Skeleton disableAnimate={disableAnimate} className={classes.lastLine} height={10} width="40%" />
    </div>
);

const skeletonText = (key, classes, disableAnimate) => (
    <div key={key} className={classes.toFlex}>
        {skeletonItem(classes, disableAnimate)}
        {skeletonItem(classes, disableAnimate)}
    </div>
);

// each swiping will trigger slideRenderer even though data from server has yet come
// resulting slideRenderer to render previous hadith again instead of empty/white screen
// so when swiping set allowSwipeRender to false to block rendering prev hadith
// and then set to true by senderDataRequest.js in DispatchResult() after data has received
let allowSwipeRender = false, outboundLeft = false, outboundRight = false;
// use in senderDataRequest.js in DispatchResult() and in GoogleSearchInput.js
export const setAllowSwipeRender = (allow) => {
    allowSwipeRender = allow;
}
let currentSwipeIndex = 0;
const slideRenderer = ([classes, coloredArabic, coloredIndo, handleTextHadithClicked], params) => {
    const { index, key } = params;
    if (allowSwipeRender) {
        switch (index) {
            case currentSwipeIndex:
                return textAhadith([classes, coloredArabic, coloredIndo, handleTextHadithClicked, key]);
            default:
                return skeletonText(key, classes, true);
        }
    } else {
        if (outboundLeft || outboundRight) {
            return <div key={key}></div>;
        }
        return skeletonText(key, classes, false);
    }
}

// let prevScrollValue = 0;

class TextHadits extends React.Component {

    shouldComponentUpdate(nextProps) {
        if (this.props.theme.palette.type !== nextProps.theme.palette.type) {
            return true;
        }
        if (nextProps.indo !== this.props.indo) {
            return true;
        } else if (nextProps.arabicFont[0] !== this.props.arabicFont[0]) {
            return true;
        } else if (nextProps.arabicFont[2] !== this.props.arabicFont[2]) {
            return true;
        } else if (nextProps.arabicFont[3] !== this.props.arabicFont[3]) {
            return true;
        } else if (nextProps.indoFont[0] !== this.props.indoFont[0]) {
            return true;
        } else if (nextProps.indoFont[2] !== this.props.indoFont[2]) {
            return true;
        } else if (nextProps.indoFont[3] !== this.props.indoFont[3]) {
            return true;
        } else {
            return false;
        }
    };

    componentDidMount() {
        const token = localStorage.getItem('token');
        if (token) {
            authFetch(switchServer + 'fonts')
                .then(res => {
                    if (res.status === 404) return null;
                    if (!res.ok) {
                        throw new Error('Failed to fetch font')
                    }
                    return res.json();
                })
                .then(resData => {
                    if (resData) {
                        if (resData.arabic && resData.arabic[0] && resData.arabic[3] > 0) {
                            this.props.onSetArabicFont(resData.arabic);
                        }
                        if (resData.translation && resData.translation[0] && resData.translation[3] > 0) {
                            this.props.onSetIndoFont(resData.translation);
                        }
                    }
                })
                .catch(err => console.log('get font', err));
        }
        // indoScrollRef.current.addEventListener('scroll', this.handleScroll);
    };

    componentDidUpdate() {
        // the following 'if clause' work because of shouldComponentUpdate's check
        if (this.props.showInput) {
            // Hide Input other number after searching
            this.props.onShowInputOtherNumber(!this.props.showInput);
        }
    };

    // componentWillUnmount() {
    //     arabicScrollRef.current.removeEventListener('scroll', this.handleScroll);
    //     indoScrollRef.current.removeEventListener('scroll', this.handleScroll);
    // }

    // handleScroll = event => {
    //     if (currentSizeId === 'xs') {
    //         const sanadScroll = event.target.scrollTop;

    //         const height = event.target.scrollHeight - event.target.clientHeight;

    //         const scrolled = sanadScroll / height;
    //         if (scrolled >= 0.04) {
    //             if (scrolled <= 0.09) {
    //                 if (prevScrollValue - scrolled > 0) { // if plus that means scrollUp
    //                     this.props.onShowKitabNBab(true);
    //                 } else { // if minus that means scrolldown
    //                     this.props.onShowKitabNBab(false);
    //                 }
    //             }
    //         }
    //         prevScrollValue = scrolled;
    //     }
    // }

    handleTextHadithClicked = () => {
        if (this.props.openProfile) {
            this.props.onShowProfile(false);
        } else if (this.props.openDetailsColor) {
            this.props.onShowDetailsColor(false);
        }
    };

    handleChangeIndex = (nextIndex, prevIndex) => {
        allowSwipeRender = false; // will be set to true in senderDataRequest.js in dispatchResult()
        currentSwipeIndex = nextIndex;
        let prevOrNext;
        if (nextIndex > prevIndex) {
            if (this.props.position == this.props.totalRow) {
                outboundRight = true;
                return;
            }
            if (outboundLeft) {
                // enter here means current position is outbound left
                allowSwipeRender = true;
                outboundLeft = false;
                return;
            } else {
                prevOrNext = () => expHandlePrevNextHadits.current(+1);
            }
        } else if (nextIndex < prevIndex) {
            if (this.props.position == 1) {
                outboundLeft = true;
                return;
            }
            if (outboundRight) {
                // enter here means current position is outbound right
                allowSwipeRender = true;
                outboundRight = false;
                return;
            } else {
                prevOrNext = () => expHandlePrevNextHadits.current(-1);
            }
        }
        prevOrNext();
        outboundLeft = false;
        outboundRight = false;
    };

    // handleSwitch = (index, type) => {
    // }

    // handleLoadHadith = () => {
    //     expDispatchMainData();
    // }

    render() {
        const { classes, whatDataIsShown } = this.props;

        let coloredArabic = '', coloredIndo = '';
        if (this.props.arabic) {
            // COLORING TEXT INSIDE BRACES
            coloredArabic = replaceBraces(this.props.arabic, whatDataIsShown, 'Arabic Gundul');
            coloredIndo = replaceBraces(this.props.indo, whatDataIsShown, 'Indonesia');

            // coloring found text when showing search result
            if (whatDataIsShown === SEARCHDATA && keyWords.length) {
                if (columnName === 'Indonesia') {
                    coloredIndo = coloringFoundText(coloredIndo, keyWords, columnName);
                } else {
                    coloredArabic = coloringFoundText(coloredArabic, keyWords, columnName);
                }
            }

            if (currentSizeId === 'xs') {
                return (
                    <VirtualizeSwipeableViews
                        style={{ order: 1, overflow: 'hidden', height: '100%' }}
                        containerStyle={{ height: '100%' }}
                        slideStyle={{ overflow: 'hidden', height: '100%' }}
                        enableMouseEvents={false}
                        hysteresis={0.5}
                        overscanSlideAfter={1}
                        overscanSlideBefore={2}
                        onChangeIndex={this.handleChangeIndex}
                        disabled={this.props.totalRow === 1 ? true : false}
                        // onSwitching={this.handleSwitch}
                        // onTransitionEnd={this.handleLoadHadith}
                        slideRenderer={(params) => slideRenderer([classes, coloredArabic, coloredIndo, this.handleTextHadithClicked], params)}
                    />
                );
            } else {
                return textAhadith([classes, coloredArabic, coloredIndo, this.handleTextHadithClicked]);
            }
        } else {
            // if skeleton isn't about to be rendered then currentSwipeIndex should be set to 0
            // otherwise next time showing hadith will fail because index in slideRenderer reset to its initial value
            // where as currentSwipeIndex isn't, thus fail when comparing value in slideRenderer
            currentSwipeIndex = 0; // this line is important
            // there is no text on first time load so don't render skeleton
            // instead render this
            return textAhadith([classes, coloredArabic, coloredIndo, this.handleTextHadithClicked]);
        }
    };
};

const mapStateToProps = state => {
    return {
        arabic: state.mainBooksData.Arabic,
        indo: state.mainBooksData.Indonesia,
        showInput: state.otherNumberData.showInput,
        arabicFont: state.fontSetting.arabicFont,
        indoFont: state.fontSetting.indoFont,
        openProfile: state.showProfile.openProfile,
        openDetailsColor: state.showDetailsColor.openDetailsColor,
        whatDataIsShown: state.mainBooksData.WhatDataIsShown,
        position: state.mainBooksData.Position,
        totalRow: state.mainBooksData.TotalRow,
        // swipeIndex: state.swipeableIndex.swipeIndex
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onShowInputOtherNumber: (booLean) => dispatch({ type: SHOWINPUTOTHERNUMBER, show: booLean }),
        onSetArabicFont: (arab) => dispatch({ type: SETARABICFONT, aFont: arab }),
        onSetIndoFont: (indo) => dispatch({ type: SETINDOFONT, iFont: indo }),
        onShowProfile: (booLean) => dispatch({ type: SHOWPROFILE, open: booLean }),
        onShowDetailsColor: (booLean) => dispatch({ type: SHOWDETAILSCOLOR, open: booLean }),
        // onShowKitabNBab: (booLean) => dispatch({ type: KITABANDBAB, show: booLean }),
        // onSwipeableIndexChanged: (index) => dispatch({ type: SWIPEABLEINDEX, idx: index })
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(withTheme(TextHadits)));