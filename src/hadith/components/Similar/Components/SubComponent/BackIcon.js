import React from 'react';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Zoom from '@material-ui/core/Zoom';

import sender from '../../../../sender/senderDataRequest';
import prepareSenderKedudukan from '../../../../fungsi/prepareSenderKedudukan';
import * as detailsPerBook from '../../../../store/totalHaditsEachBook';
import { connect } from 'react-redux';
import {
    CURRENTTABLE,
    NUMBEREACHBOOKS,
    EXPANDCOLLAPSE,
    TITLEFORLOAD,
    BOOKMARKLIST,
    TOTALROW,
    SIMILARDATA,
    INDEXLEFTTAB,
    MAINBOOKSDATA,
    CLASSIFICATIONDATA,
    BOOKMARKDATA,
    SEARCHDATA,
    TOTALHADITHDATA,
} from '../../../../store/action';
import store from '../../../Bookmark/InputAndCombo';
import { closeDialogTab } from '../../../../fungsi/closeDialogTab';
import { currentSizeId } from '../../../../store/currentScreenSize';
import arrayOfKitabsName from '../../../../store/arrayOfKitabsName';

const BackIcon = props => {

    const handleClick = () => {
        if (props.whatDataIsShown === SIMILARDATA) {
            switch (props.dataBeforeSimilar) {
                case MAINBOOKSDATA:
                    if (props.leftTab !== 0) props.onLeftTabIndexChanged(0);
                    sender('loadMainData', props.hadithBeforeSimilar);
                    // set state current shown table name
                    props.onCurrentShownTable(props.hadithBeforeSimilar[0]);
                    break;
                case CLASSIFICATIONDATA:
                    // kedudukan dan tema digabung jd satu chanel 'classificationData'
                    prepareSenderKedudukan('classificationData', props.hadithBeforeSimilar);
                    // set state current shown table name
                    props.onCurrentShownTable(props.hadithBeforeSimilar);
                    // set state to show number of hadits in each book
                    props.onDetailsHaditsPerBooks(detailsPerBook[props.hadithBeforeSimilar]);

                    // Set a delay so that the animation can work
                    setTimeout(() => {
                        if (props.hadithBeforeSimilar.includes('Kumpulan')) {
                            if (props.leftTab !== 1) props.onLeftTabIndexChanged(1);
                            props.onExpandingPanel([props.hadithBeforeSimilar, false]);
                        } else {
                            if (props.leftTab !== 2) props.onLeftTabIndexChanged(2);
                            props.onExpandingPanel([false, props.hadithBeforeSimilar]);
                        }
                    }, 120);
                    break;
                case BOOKMARKDATA:
                    if (props.leftTab !== 3) props.onLeftTabIndexChanged(3);
                    props.onTitleForLoadChanged(props.hadithBeforeSimilar[0]);
                    const arrayOfObject = store.get(props.hadithBeforeSimilar[0]);
                    // store bookmark list into redux state for further use
                    // in AppBar to navigate through each hadits
                    props.onStoreBookmarkList(arrayOfObject);
                    const num = props.hadithBeforeSimilar[1];
                    sender('loadCustomData', [arrayOfObject[num - 1].book, arrayOfObject[num - 1].no, num, BOOKMARKDATA]);
                    const totalHadits = arrayOfObject.length;
                    if (totalHadits != props.totalRow) {
                        props.onDispatchCountRow(totalHadits);
                    }
                    // set state current shown table name
                    props.onCurrentShownTable(props.hadithBeforeSimilar[0]);
                    break;
                case SEARCHDATA:
                    if (props.leftTab !== 4) props.onLeftTabIndexChanged(4);
                    const pos = props.hadithBeforeSimilar;
                    const keyOfNum = Object.keys(props.searchResult[pos - 1])[0];
                    const numToKitabName = arrayOfKitabsName[keyOfNum];
                    sender('loadCustomData',
                        [numToKitabName,
                        Object.values(props.searchResult[pos - 1])[0],
                            pos, SEARCHDATA]);
                    if (props.totalRow != props.searchResult.length) {
                        props.onDispatchCountRow(props.searchResult.length);
                    }
                    // set state current shown table name
                    props.onCurrentShownTable('');
                    break;
                case TOTALHADITHDATA:
                    sender('loadCustomData',
                        [props.hadithBeforeSimilar[0], // kitabName
                        props.hadithBeforeSimilar[1], // number hadith
                        props.hadithBeforeSimilar[2], // position number of hadith
                            TOTALHADITHDATA]);
                    // set state current shown table name
                    props.onCurrentShownTable(props.hadithBeforeSimilar[0]);
                    if (props.totalRow != props.hadithBeforeSimilar[3]) { // total hadith
                        props.onDispatchCountRow(props.hadithBeforeSimilar[3]);
                    }
                    break;
                default:
                    return;
            }
            if (currentSizeId === 'xs') {
                closeDialogTab(false, 'left');
            }
        }
    };

    return (
        <ListItemIcon>
            <Tooltip TransitionComponent={Zoom} title='Back'>
                <IconButton onClick={handleClick}><ArrowBackIcon /></IconButton>
            </Tooltip>
        </ListItemIcon>
    );
}

const mapStateToProps = state => {
    return {
        hadithBeforeSimilar: state.backFromSimilar.hadithBeforeSimilar,
        dataBeforeSimilar: state.backFromSimilar.dataBeforeSimilar,
        shownTable: state.currentTable.shownTable,
        totalRow: state.mainBooksData.TotalRow,
        searchResult: state.searchResult.searchResult,
        whatDataIsShown: state.mainBooksData.WhatDataIsShown,
        leftTab: state.indexTab.leftTab,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onCurrentShownTable: (table) => dispatch({ type: CURRENTTABLE, currentTable: table }),
        onDetailsHaditsPerBooks: (arrAy) => dispatch({ type: NUMBEREACHBOOKS, arrayOfNumber: arrAy }),
        onExpandingPanel: (arrAy) => dispatch({ type: EXPANDCOLLAPSE, nameOrfalse: arrAy }),
        onTitleForLoadChanged: (teks) => dispatch({ type: TITLEFORLOAD, value: teks }),
        onStoreBookmarkList: (arRay) => dispatch({ type: BOOKMARKLIST, value: arRay }),
        onDispatchCountRow: (rows) => dispatch({ type: TOTALROW, totalRow: rows }),
        onLeftTabIndexChanged: (val) => dispatch({ type: INDEXLEFTTAB, index: val }),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(BackIcon));