import React, { useMemo, useRef, useEffect } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import Typography from '@material-ui/core/Typography';
import Hidden from '@material-ui/core/Hidden';

import { connect } from 'react-redux';
import sender from '../../sender/senderDataRequest';
import PositionInput from '../items/PositionInput';
import getKitabName from '../../fungsi/getKitabName';
import { getMainTable_Kedudukan } from '../../fungsi/getTableName';
import { getCompactImamName } from '../../fungsi/getImamName';
import getCompleteKitabName from '../../fungsi/getCompleteKitabName';
import { getCompactClassName } from '../../fungsi/getClassificationName';
import arrayOfKitabsName from '../../store/arrayOfKitabsName';
import {
    MAINBOOKSDATA,
    CLASSIFICATIONDATA,
    BOOKMARKDATA,
    SEARCHDATA,
    TOTALHADITHDATA,
    SIMILARDATA,
    SELECTEDSIMILAR
} from '../../store/action';
import { withRouter } from "react-router";

const useStyles = makeStyles(theme => ({
    title: {
        display: 'inline',
        fontSize: '70%',
        marginRight: theme.spacing(1),
        color: theme.palette.type === 'light' ? 'inherit' : '#fff'
        // [theme.breakpoints.down('xs')]: {
        //   display: 'none'
        // }
    }
}));

export let expHandleFirstLastHadits, expHandlePrevNextHadits;

const NavComponent = (props) => {
    const classes = useStyles();
    const theme = useTheme();

    const handleFirstLastHadits = (firstLast) => { // Value of firstLast is either 1 or props.TotalRow
        // Checking for what type of data is currently being shown (i.e. MainBooks, etc.)
        switch (props.WhatDataIsShown) {
          case MAINBOOKSDATA:
            // untuk mengatur url
            props.history.push(`/main/${getCompactImamName(props.shownTable)}/${firstLast}`);
            // Future plan get table name from props.shownTable
            // instead of get rid the number and white space from props.KitabName
            // coz a lot of work to do there especially with regex
            sender('loadMainData', [props.shownTable, firstLast]);
            break;
          case CLASSIFICATIONDATA:
            const mainKitab = getMainTable_Kedudukan(firstLast, props.shownTable);
            props.history.push(`/class/${getCompactClassName(props.shownTable)}/${getCompactImamName(mainKitab)}/${firstLast}`);
            // Inside array example > [ShahihBukhari, KumpulanAlQuran, 5]
            sender('classificationData', [mainKitab, firstLast, props.shownTable]);
            break;
          case BOOKMARKDATA:
            const arrayOfObject = props.bookmarkList;
            const indexPos = firstLast - 1;
            props.history.push(`/bookmark/${props.shownTable}/${firstLast}/${getCompactImamName(arrayOfObject[indexPos].book)}/${arrayOfObject[indexPos].no}`);
            // Inside array example > [ShahihBukhari, 5, 1]
            sender('loadCustomData',
            [arrayOfObject[indexPos].book,
            arrayOfObject[indexPos].no,
            firstLast,
            BOOKMARKDATA]);
            break;
          case SEARCHDATA:
            const keyOfNum = Object.keys(props.searchResult[firstLast - 1])[0];
            const numToKitabName = arrayOfKitabsName[keyOfNum];
            // Inside array example > [ShahihBukhari, 5, 1]
            sender('loadCustomData',
            [numToKitabName,
            Object.values(props.searchResult[firstLast - 1])[0],
            firstLast,
            SEARCHDATA]);

            const queryParams = new URLSearchParams(props.location.search);
            const query = queryParams.get('query');
            const mode = queryParams.get('mode');
            const books = queryParams.get('books');
            props.history.push(`/search?query=${query}&mode=${mode}&books=${books}&no=${firstLast}`);

            break;
          case TOTALHADITHDATA:
            // props.totalNarrated contains => array of {NoHdt: 5}, ...
            // Inside array example > [ShahihBukhari, 5, 1]
            sender('loadCustomData',
            [getKitabName(props.KitabName),
            props.totalNarrated[firstLast - 1].NoHdt,
            firstLast,
            TOTALHADITHDATA]);
            break;
          case SIMILARDATA:
            // example: {Nama: "Bukhari", NoBanding: 52}
            const oneObjOfSimilarHadits = props.similarData[firstLast - 1];
            const completeKitabName = getCompleteKitabName(oneObjOfSimilarHadits['Nama']);
            const hadithNumber = oneObjOfSimilarHadits['NoBanding'];
            sender('loadCustomData',
            [completeKitabName,
            hadithNumber,
            firstLast,
            SIMILARDATA]);
            props.onSelectSimilar(oneObjOfSimilarHadits['Nama'] + hadithNumber);
            break;
          default:
            break;
        }
    }

    const handlePrevNextHadits = (prevOrNext) => { // Value of prevOrNext is either +1 or -1
        // If position already in the first or in  the last then terminate the process
        // but no need to check it because the nav button already disabled if in the first/last
        switch (props.WhatDataIsShown) {
          case MAINBOOKSDATA:
            const targetNumber = +props.Nomer + prevOrNext;
            props.history.push(`/main/${getCompactImamName(props.shownTable)}/${targetNumber}`);
            // Get hadits from database each time changing position
            sender('loadMainData', [props.shownTable, targetNumber]);
            break;
          case CLASSIFICATIONDATA:
            const mainKitab = getMainTable_Kedudukan(+props.position + prevOrNext, props.shownTable);
            props.history.push(`/class/${getCompactClassName(props.shownTable)}/${getCompactImamName(mainKitab)}/${+props.position + prevOrNext}`);
            // Inside array example > [ShahihBukhari, KumpulanAlQuran, 5]
            sender('classificationData', [mainKitab, +props.position + prevOrNext, props.shownTable]);
            break;
          case BOOKMARKDATA:
            let targetPosition = +props.position;
            if (prevOrNext === -1) {
              targetPosition = +props.position - 2;
            }
            props.history.push(`/bookmark/${props.shownTable}/${+props.position + prevOrNext}/${getCompactImamName(props.bookmarkList[targetPosition].book)}/${props.bookmarkList[targetPosition].no}`);
            // Inside array example > [ShahihBukhari, 5, 1]
            sender('loadCustomData',
            [props.bookmarkList[targetPosition].book,
            props.bookmarkList[targetPosition].no,
            +props.position + prevOrNext,
            BOOKMARKDATA]);
            break;
          case SEARCHDATA:
            let targetPositionS = +props.position;
            if (prevOrNext === -1) {
              targetPositionS = +props.position - 2;
            }
            const keyOfNum = Object.keys(props.searchResult[targetPositionS])[0];
            const numToKitabName = arrayOfKitabsName[keyOfNum];

            const prevNextPos = +props.position + prevOrNext;
            // Inside array example > [ShahihBukhari, 5, 1]
            sender('loadCustomData',
            [numToKitabName,
            Object.values(props.searchResult[targetPositionS])[0],
            prevNextPos,
            SEARCHDATA]);

            const queryParams = new URLSearchParams(props.location.search);
            const query = queryParams.get('query');
            const mode = queryParams.get('mode');
            const books = queryParams.get('books');
            props.history.push(`/search?query=${query}&mode=${mode}&books=${books}&no=${prevNextPos}`);
            
            break;
          case TOTALHADITHDATA:
            let targetPositionX = +props.position;
            if (prevOrNext === -1) {
              targetPositionX = +props.position - 2;
            }
            // Inside array example > [ShahihBukhari, 5, 1]
            sender('loadCustomData',
            [getKitabName(props.KitabName),
            Object.values(props.totalNarrated[targetPositionX])[0],
            +props.position + prevOrNext,
            TOTALHADITHDATA]);
            break;
          case SIMILARDATA:
            let targetPositionZ = +props.position;
            if (prevOrNext === -1) {
              targetPositionZ = +props.position - 2;
            }
            // example: {Nama: "Bukhari", NoBanding: 52}
            const oneObjOfSimilarHadits = props.similarData[(+props.position + prevOrNext) - 1];
            const completeKitabName = getCompleteKitabName(oneObjOfSimilarHadits['Nama']);
            const hadithNumber = oneObjOfSimilarHadits['NoBanding'];
            sender('loadCustomData',
            [completeKitabName,
            hadithNumber,
            +props.position + prevOrNext,
            SIMILARDATA]);
            props.onSelectSimilar(oneObjOfSimilarHadits['Nama'] + hadithNumber);
            break;
          default:
            break;
        }
    }

    const refHandleFirstLast = useRef(handleFirstLastHadits);
    const refHandlePrevNext = useRef(handlePrevNextHadits);

    useEffect(() => {
        refHandleFirstLast.current = handleFirstLastHadits;
        refHandlePrevNext.current = handlePrevNextHadits;
        // export
        expHandleFirstLastHadits = refHandleFirstLast;
        expHandlePrevNextHadits = refHandlePrevNext;
    }, [handleFirstLastHadits, handlePrevNextHadits]);

    const firstPrevIcon = useMemo(() => (
        <>
            <IconButton
                disabled={props.firstPrev}
                onClick={() => refHandleFirstLast.current(1)}
            >
                <FirstPageIcon />
            </IconButton>
            <IconButton
                disabled={props.firstPrev}
                onClick={() => refHandlePrevNext.current(-1)}
            >
                <ChevronLeftIcon />
            </IconButton>
        </>
    ), [props.firstPrev, theme.palette.type]);

    const totalHadiths = useMemo(() => (
        <Typography className={classes.title} color="inherit" noWrap>
            <Hidden smDown>/</Hidden> {props.TotalRow}
        </Typography>
    ), [props.TotalRow, theme.palette.type]);
    
    const nextIcon = useMemo(() => (
        <IconButton
            disabled={props.lastNext}
            onClick={() => refHandlePrevNext.current(+1)}
        >
            <ChevronRightIcon />
        </IconButton>
    ), [props.lastNext, theme.palette.type]);
    
    const lastIcon = useMemo(() => (
        <IconButton
            disabled={props.lastNext}
            onClick={() => refHandleFirstLast.current(props.TotalRow)}
        >
            <LastPageIcon />
        </IconButton>
    ), [props.lastNext, props.TotalRow, theme.palette.type]);

    return (
        <>
            {firstPrevIcon}            
            <PositionInput inputStyles={props.inputStyles} identity='AppBar' />
            {totalHadiths}
            {nextIcon}
            {lastIcon}
        </>
    );
}

const mapStateToProps = state => {
    return {
      WhatDataIsShown: state.mainBooksData.WhatDataIsShown,
      KitabName: state.mainBooksData.KitabName,
      Nomer: state.mainBooksData.Nomer,
      TotalRow: state.mainBooksData.TotalRow, //
      position: state.mainBooksData.Position,
      firstPrev: state.disableNavButton.firstPrev, //
      lastNext: state.disableNavButton.lastNext, //
      shownTable: state.currentTable.shownTable,
      bookmarkList: state.bookmarkContent.bookmarkList,
      searchResult: state.searchResult.searchResult,
      totalNarrated: state.totalHadith.totalNarrated,
      similarData: state.similar.similarData
    };
  }
  
  const mapDispatchToProps = dispatch => {
    return {
      onSelectSimilar: (str) => dispatch({ type: SELECTEDSIMILAR, select: str }),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(withRouter(NavComponent)));