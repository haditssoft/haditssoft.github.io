import { switchServer, authFetch } from './api';
import getKitabName from '../fungsi/getKitabName';
import getNoteName from '../fungsi/getNoteName';
import { SIMILARDATA } from '../store/action';
import * as kitabsName from '../store/kitabsName';
import setOpenedTableName, { currentOpenedTable, prevOpenedTable } from '../store/openedTableName';
import { isSizeSmall, currentSizeId } from '../store/currentScreenSize';
import { setAllowSwipeRender } from '../components/items/TextHadits';
import { setKitabName } from '../components/Report/ReportForm';
import { posInputRef } from '../components/items/PositionInput';
import arrayOfKitabsName, { bookHaveNoChain } from '../store/arrayOfKitabsName';
import { requestAiSummary } from './aiSummarySender';
import {
    AMOUNTBUKHARI,
    AMOUNTMUSLIM,
    AMOUNTTIRMIDZI,
    AMOUNTABUDAUD,
    AMOUNTNASAI,
    AMOUNTIBNUMAJAH,
    AMOUNTDARIMI,
    AMOUNTAHMAD,
    AMOUNTMALIK,
    AMOUNTDARUQUTHNI,
    AMOUNTIBNUKHUZAIMAH,
    AMOUNTIBNUHIBBAN,
    AMOUNTALMUSTADRAK,
    AMOUNTSYAFII
} from '../store/action';

// each hold a function which return an object where its values are props of redux action and state
let dispatchMainContentProps,
    dispatchTotalRowProps,
    dispatchKitabProps,
    dispatchBabProps,
    dispatchOtherNumber,
    dispatchBiography,
    dispatchSearchCount,
    dispatchSanadHadith,
    dispatchScholarComment,
    dispatchTotalHadith,
    dispatchSimilarHadith,
    dispatchListOfNarratorName,
    dispatchCompleteProfile;

export const setDispatchMainContent = func => {
    dispatchMainContentProps = func;
}
export const setDispatchTotalRow = func => {
    dispatchTotalRowProps = func;
}
export const setDispatchKitab = func => {
    dispatchKitabProps = func;
}
export const setDispatchBab = func => {
    dispatchBabProps = func;
}
export const setDispatchOtherNumber = func => {
    dispatchOtherNumber = func;
}
export const setDispatchBiography = func => {
    dispatchBiography = func;
}
export const setDispatchSearchCount = func => {
    dispatchSearchCount = func;
}
export const setDispatchSanadHadith = func => {
    dispatchSanadHadith = func;
}
export const setDispatchScholarComment = func => {
    dispatchScholarComment = func;
}
export const setDispatchTotalHadith = func => {
    dispatchTotalHadith = func;
}
export const setDispatchSimilarHadith = func => {
    dispatchSimilarHadith = func;
}
export const setDispatchListOfNarratorName = func => {
    dispatchListOfNarratorName = func;
}
export const setDispatchCompleteProfile = func => {
    dispatchCompleteProfile = func;
}

var storeDispatch = null;

export const setStoreDispatch = function (dispatch) {
    storeDispatch = dispatch;
};

const saveLastRead = (tableName, num) => {
    const token = localStorage.getItem('token');
    if (token) {
        authFetch(switchServer + 'lastRead', {
            method: 'PUT',
            body: JSON.stringify({ book_name: tableName, number: num })
        }).catch(err => console.log('save lastread', err));
    }
}

let countDown;
let prevNumberOfHadit = 0;
const countDownToSaveLastRead = (tableName, num) => {
    if (tableName === prevOpenedTable) {
        // if still in the same table/kitab/category/class
        countDown = setTimeout(() => {
            saveLastRead(tableName, num);
        }, 20000);
    } else {
        // if changed to other table/kitab/category/class no need to wait just save already
        saveLastRead(prevOpenedTable, prevNumberOfHadit);
        // tableName is currentOpenedTable say it holds 'TemaIlmu'
        // as for prevOpenedTable holds, say, 'TemaIman'
        // after saving lastRead, prevOpenedTable needs to be set the same as currentOpenedTable
        // so that if user click first/last or next/prev hadith
        // this check above: if (tableName === prevOpenedTable) will succeed
        // otherwise it will keep saving the lastRead each time changing hadith's position/number
        setOpenedTableName(tableName);
    }
}

const stopCountDown = () => {
    clearTimeout(countDown);
}

// will be use in TextHadits handler handleLoadHadith()
// export let expDispatchMainData = null;
const dispatchResult = ([mainData, dataType, positionForclassificationData]) => {
    const getSubStr = mainData[0].Indonesia.substring(0, mainData[0].Indonesia.indexOf(':'));
    mainData[0].KitabName = getSubStr;
    // eslint-disable-next-line
    if (dataType == 'MAINBOOKSDATA') {
        if (currentSizeId === 'xs') {
            setAllowSwipeRender(true);
        }
        dispatchMainContentProps().onDispatchMainData(mainData, dataType);
        // this value will be use when saving lastRead refer to previous hadith number
        prevNumberOfHadit = +mainData[0].Nomer;
    } else { //if (dataType === 'CLASSIFICATIONDATA' || dataType === 'BOOKMARKDATA') {
        if (currentSizeId === 'xs') {
            setAllowSwipeRender(true);
        }
        dispatchMainContentProps().onDispatchCustomData(mainData, dataType, positionForclassificationData);
        // this value will be use when saving lastRead refer to previous hadith position
        prevNumberOfHadit = +positionForclassificationData;
    }

    // Trigger AI summary for the loaded hadith
    if (storeDispatch) {
        requestAiSummary(
            storeDispatch,
            mainData[0].Arabic,
            mainData[0].Indonesia
        );
    }

    // check if sanad or similar should be displayed
    switch (dispatchMainContentProps().windowWidth) {
        case 'md':
            if (dispatchMainContentProps().hideRightTab) {
                if (dispatchMainContentProps().selectedSimilar) dispatchMainContentProps().onSelectSimilar('');
                break;
            }
        case 'lg':
        case 'xl':
            // on enter this line it means right tab is visible
            switch (dispatchMainContentProps().rightTab) {
                case 1:
                    if (dispatchMainContentProps().openProfile) dispatchMainContentProps().onShowProfile(false);
                    if (dispatchMainContentProps().openDetailsColor) dispatchMainContentProps().onShowDetailsColor(false);
                    const getTheNameOfKitab = getKitabName(getSubStr);
                    if (bookHaveNoChain.includes(getTheNameOfKitab)) {
                        return dispatchSanadHadith().onShowSanad(false);
                    }
                    sender('loadSanadHadits', ['Sanad' + getTheNameOfKitab, +mainData[0].Nomer]);
                    break;
                case 2:
                    if (dispatchMainContentProps().whatDataIsShown !== SIMILARDATA) {
                        const getTheNameOfKitab = getKitabName(getSubStr);
                        if (bookHaveNoChain.includes(getTheNameOfKitab)) {
                            return dispatchSimilarHadith().onShowSimilar(false);
                        }
                        sender('loadSimilarHadith', ['Banding' + getTheNameOfKitab, +mainData[0].Nomer]);
                        if (dispatchMainContentProps().selectedSimilar) dispatchMainContentProps().onSelectSimilar('');
                    };
                    break;
                case 3:
                    if (dispatchMainContentProps().openProfile) dispatchMainContentProps().onShowProfile(false);
                    break;
                default:
                    break;
            }
            break;
        default:
            break;
    }
    // check if there any note for this hadith
    const token = localStorage.getItem('token');
    if (token) {
        const noteStore = getKitabName(getSubStr);
        authFetch(switchServer + 'notes/' + noteStore + '/' + mainData[0].Nomer)
            .then(res => {
                if (res.status === 404) {
                    return null;
                }
                if (res.status !== 200) {
                    throw new Error('Failed checking existing note');
                }
                return res.json();
            })
            .then(resData => {
                console.log('resData', resData);
                if (resData && resData.note) { // note exist
                    if (!dispatchMainContentProps().noteExist) dispatchMainContentProps().onNoteExist(true);
                    if (dispatchMainContentProps().openNote) dispatchMainContentProps().onShowNote(false);
                } else { // note doesn't exist
                    if (dispatchMainContentProps().noteExist) dispatchMainContentProps().onNoteExist(false);
                    if (dispatchMainContentProps().openNote) dispatchMainContentProps().onShowNote(false);
                }
            })
            .catch(err => console.log('checknote', err));
    }
    // for better experience in mobile device, after press enter on position input
    // the compoponent should be blured so that keyboard will be disappear
    if (isSizeSmall) {
        if (posInputRef.current) {
            posInputRef.current.blur();
        }
    }
    // to be used in SubmitButton.js for sending report
    setKitabName(getSubStr);
}

const dispatchCount = (totalRows) => {
    // Receive total rows of the data currently being shown from database
    // send it to redux state, react will then show it in AppBar
    const howManyRows = totalRows[0]['count(*)'];
    if (howManyRows !== dispatchTotalRowProps().TotalRow) {
        dispatchTotalRowProps().onDispatchCountRow(howManyRows);
    };
};

const dispatchResultKitab = (kitabData) => {
    if (JSON.stringify(kitabData) !== JSON.stringify(dispatchKitabProps().kitab)) {
        dispatchKitabProps().onDispatchResultKitab(kitabData);
    };
};

const dispatchResultBab = (babData) => {
    if (JSON.stringify(babData) !== JSON.stringify(dispatchBabProps().bab)) {
        dispatchBabProps().onDispatchResultBab(babData);
    };
};

const dispatchResultOtherNumber = (result) => {
    // IMPORTANT
    // IN THE BACK-END OTHER NUMBER HAS BEEN TRANSFORMED INTO STRING E.G "243, 244",
    // WHICH IS ALREADY IN READY STATE TO DISPATCH TO REDUX STATE
    // BEFORE THIS THE VALUE BEING SENT WAS AN ARRAY CONTAIN AN OBJECT [{}]
    // WHICH CONTAINS KEY-VALUE PAIR OF ALL NINE COLUMNS  
    if (result === dispatchOtherNumber().noLain) {
        return;
    }
    dispatchOtherNumber().onDispatchOtherNumber(result);
};

const dispatcResulthBiography = ([result, name]) => {
    dispatchBiography().onStoreTextBiography(name, result[0].Biografi);
    dispatchBiography().onOpenCloseBiography(true);
};

const dispatchResultSearchCount = ([result, , kitab]) => {
    let action = '';
    switch (kitab) {
        case kitabsName.SHAHIHBUKHARI:
            action = AMOUNTBUKHARI;
            break;
        case kitabsName.SHAHIHMUSLIM:
            action = AMOUNTMUSLIM;
            break;
        case kitabsName.SUNANTIRMIDZI:
            action = AMOUNTTIRMIDZI;
            break;
        case kitabsName.SUNANABUDAUD:
            action = AMOUNTABUDAUD;
            break;
        case kitabsName.SUNANNASAI:
            action = AMOUNTNASAI;
            break;
        case kitabsName.SUNANIBNUMAJAH:
            action = AMOUNTIBNUMAJAH;
            break;
        case kitabsName.SUNANDARIMI:
            action = AMOUNTDARIMI;
            break;
        case kitabsName.MUSNADAHMAD:
            action = AMOUNTAHMAD;
            break;
        case kitabsName.MUWATHAMALIK:
            action = AMOUNTMALIK;
            break;
        case kitabsName.SUNANDARUQUTHNI:
            action = AMOUNTDARUQUTHNI;
            break;
        case kitabsName.SHAHIHIBNUKHUZAIMAH:
            action = AMOUNTIBNUKHUZAIMAH;
            break;
        case kitabsName.SHAHIHIBNUHIBBAN:
            action = AMOUNTIBNUHIBBAN;
            break;
        case kitabsName.ALMUSTADRAK:
            action = AMOUNTALMUSTADRAK;
            break;
        case kitabsName.MUSNADSYAFII:
            action = AMOUNTSYAFII;
            break;
        default:
            break;
    }
    dispatchSearchCount().onStoreAmountOfResult(action, +dispatchSearchCount().amountTotal + result.length, result.length);
    if (result.length !== 0) {
        dispatchSearchCount().onDispatchCountRow(+dispatchSearchCount().totalRow + result.length);
        dispatchSearchCount().onStoreSearchResult([...dispatchSearchCount().searchResult || [], ...result || []]);
    }
    dispatchSearchCount().sendSearchRequest('continue');
};

const dispatchResultSearchCountAllBooks = (result, checkedBooks) => {
    const amountActions = {
        [kitabsName.SHAHIHBUKHARI]: AMOUNTBUKHARI,
        [kitabsName.SHAHIHMUSLIM]: AMOUNTMUSLIM,
        [kitabsName.SUNANTIRMIDZI]: AMOUNTTIRMIDZI,
        [kitabsName.SUNANABUDAUD]: AMOUNTABUDAUD,
        [kitabsName.SUNANNASAI]: AMOUNTNASAI,
        [kitabsName.SUNANIBNUMAJAH]: AMOUNTIBNUMAJAH,
        [kitabsName.SUNANDARIMI]: AMOUNTDARIMI,
        [kitabsName.MUSNADAHMAD]: AMOUNTAHMAD,
        [kitabsName.MUWATHAMALIK]: AMOUNTMALIK,
        [kitabsName.SUNANDARUQUTHNI]: AMOUNTDARUQUTHNI,
        [kitabsName.SHAHIHIBNUKHUZAIMAH]: AMOUNTIBNUKHUZAIMAH,
        [kitabsName.SHAHIHIBNUHIBBAN]: AMOUNTIBNUHIBBAN,
        [kitabsName.ALMUSTADRAK]: AMOUNTALMUSTADRAK,
        [kitabsName.MUSNADSYAFII]: AMOUNTSYAFII
    };
    const total = result.total || 0;
    let allRows = [];
    // first set all checked books to 0 so chips appear even for books with no results
    if (checkedBooks) {
        for (const kitab of checkedBooks) {
            const action = amountActions[kitab];
            if (action) {
                dispatchSearchCount().onStoreAmountOfResult(action, total, 0);
            }
        }
    }
    let entries = result.results ? Object.entries(result.results) : Object.entries(result);
    entries = entries.filter(([k]) => k !== 'total').sort((a, b) => {
        const ai = arrayOfKitabsName.indexOf(a[0]);
        const bi = arrayOfKitabsName.indexOf(b[0]);
        return (ai === -1 ? 999 : ai) - (bi === -1 ? 999 : bi);
    });
    for (const [kitab, data] of entries) {
        const action = amountActions[kitab];
        if (action && data) {
            dispatchSearchCount().onStoreAmountOfResult(action, total, data.count || 0);
        }
        if (data && data.rows) {
            allRows = allRows.concat(data.rows);
        }
    }
    dispatchSearchCount().onDispatchCountRow(total);
    if (allRows.length) {
        dispatchSearchCount().onStoreSearchResult(allRows);
    }
    dispatchSearchCount().sendSearchRequest('continue');
};

const dispatchResultSanad = sanadData => {
    // always show first sanad position each time changing hadith
    if (dispatchSanadHadith().sanadPos !== 0) {
        dispatchSanadHadith().onChangeSanadPos(0);
    }
    // prepare data in RawiName.js first
    dispatchSanadHadith().onStoreSanadData(sanadData);
    // then show it
    if (dispatchSanadHadith().showSanad === false) {
        dispatchSanadHadith().onShowSanad(true);
    }
};

const dispatchResultComment = (result) => {
    dispatchScholarComment().onStoreScholarComment(result);
};

const dispatchResultTotalHadith = (result) => {
    dispatchTotalHadith().onStoreTotalHadith(result);
    dispatchTotalHadith().onDispatchCountRow((result || []).length);
};

const dispatchResultSimilar = (result) => {
    dispatchSimilarHadith().onStoreSimilarData(result);
    if (!dispatchSimilarHadith().showSimilar) dispatchSimilarHadith().onShowSimilar(true);
};

const dispatchResultListOfNarratorName = (result) => {
    dispatchListOfNarratorName().onStoreResultRawi(result);
};

const dispatchResultCompleteProfile = (result) => {
    dispatchCompleteProfile().onStoreCompleteProfile(result);
    if (isSizeSmall) {
        dispatchCompleteProfile().onShowDialogProfileRawi('profileRawi');
    } else {
        if (!dispatchCompleteProfile().openProfile) dispatchCompleteProfile().onShowProfile(true);
    }
};

// let jDate = new Date();
// let todayDate = jDate.getDate();
const sender = (identifier, [kitabOrKodeRawi, numberOrColumn, tableForClassifyOrPositionOrKeyword, actionId]) => {
    
    if (identifier === 'searchHaditsAll') {
        const url = switchServer + 'searchHadits/all/' + kitabOrKodeRawi;
        fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(tableForClassifyOrPositionOrKeyword)
        })
        .then(res => {
            if (res.status !== 200) throw new Error('Failed to fetch data.');
            return res.json();
        })
        .then(resData => {
            dispatchResultSearchCountAllBooks(resData, tableForClassifyOrPositionOrKeyword && tableForClassifyOrPositionOrKeyword.books);
        })
        .catch(err => console.log('sender', err));
        return;
    }
    const url = switchServer + identifier +
        (identifier === 'loadListOfRawiName' ? '' : ('/' + kitabOrKodeRawi +
            (numberOrColumn ? ('/' + numberOrColumn) : '') +
            (tableForClassifyOrPositionOrKeyword && typeof tableForClassifyOrPositionOrKeyword !== 'object' ?
                ('/' + tableForClassifyOrPositionOrKeyword) : '') +
            (actionId ? ('/' + actionId) : '')));

    let searchBody, header, method = 'GET';

    if (typeof tableForClassifyOrPositionOrKeyword == 'object') {
        method = 'POST';
        header = { 'Content-Type': 'application/json' };
        searchBody = JSON.stringify({ keyword: tableForClassifyOrPositionOrKeyword });
    } else if (identifier === 'loadListOfRawiName') {
        method = 'POST';
        header = { 'Content-Type': 'application/json' };
        searchBody = JSON.stringify({
            name: kitabOrKodeRawi,
            kunyah: numberOrColumn,
            classify: tableForClassifyOrPositionOrKeyword,
            level: actionId
        });
    }

    fetch(url, {
        method: method,
        headers: header,
        body: searchBody
    })
        .then(res => {
            if (res.status !== 200) {
                throw new Error('Failed to fetch data.');
            }
            return res.json();
        })
        .then(resData => {
            switch (resData[1]) {
                case 'MAINBOOKSDATA':
                case 'CLASSIFICATIONDATA':
                    dispatchCount(resData[0][0].hadithCount);
                case 'SEARCHDATA':
                case 'TOTALHADITHDATA':
                case 'SIMILARDATA':
                case 'BOOKMARKDATA':
                    dispatchResultKitab(resData[0][0].kitabTitle);
                    dispatchResultBab(resData[0][0].babTitle);
                    dispatchResultOtherNumber(resData[0][0].otherNumber);
                    return dispatchResult(resData);
                case 'SANADRESULT':
                    return dispatchResultSanad(resData[0]);
                case 'SIMILARHADITHRESULT':
                    return dispatchResultSimilar(resData[0]);
                case 'SEARCHRESULTCOUNT':
                    return dispatchResultSearchCount(resData);
                case 'COMPLETEPROFILERESULT':
                    return dispatchResultCompleteProfile(resData[0]);
                case 'SCHOLARCOMMENT':
                    return dispatchResultComment(resData[0]);
                case 'TOTALHADITHROWSRESULT':
                    dispatchResultTotalHadith(resData[0]);
                    dispatchResultKitab(resData[2][0][0].kitabTitle);
                    dispatchResultBab(resData[2][0][0].babTitle);
                    dispatchResultOtherNumber(resData[2][0][0].otherNumber);
                    return dispatchResult(resData[2]);
                case 'LISTOFNARRATORNAMERESULT':
                    return dispatchResultListOfNarratorName(resData[0]);
                case 'ALLBOOKSRESULT':
                    return dispatchResultKitab(resData[0]);
                case 'ALLCHAPTERSRESULT':
                    return dispatchResultBab(resData[0]);
                default:
                    return dispatcResulthBiography(resData);
            }
        })
        .catch(err => console.log('sender', err));

    // for saving lastread number. check above
    switch (identifier) {
        case 'loadMainData':
        case 'classificationData':
            if (countDown) stopCountDown();
            countDownToSaveLastRead(currentOpenedTable, +numberOrColumn);
            break;
        default:
            break;
    }

};

export default sender;
