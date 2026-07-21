import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './hadith/components/App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';

import { BrowserRouter as Router } from "react-router-dom";

import mainBooksDataReducer from './hadith/store/reducer/mainBooksData';
import kitabDataReducer from './hadith/store/reducer/kitabData';
import babDataReducer from './hadith/store/reducer/babData';
import valueOfShownKitabReducer from './hadith/store/reducer/valueOfShownKitab';
import disableNavButtonReducer from './hadith/store/reducer/disableNavButton';
import otherNumberDataReducer from './hadith/store/reducer/otherNumberData';
import snackBarsSettingReducer from './hadith/store/reducer/snackBarsSetting';
import currentTableReducer from './hadith/store/reducer/currentTable';
import numberEachBookReducer from './hadith/store/reducer/numberEachBook';
import indexTabReducer from './hadith/store/reducer/indexTab';
import expandedPanelReducer from './hadith/store/reducer/expandedPanel';
import controlRadioCheckReducer from './hadith/store/reducer/controlRadioCheck';
import inputComboValueReducer from './hadith/store/reducer/inputComboValue';
import bookmarkContentReducer from './hadith/store/reducer/bookmarkContent';
import checkToSearchReducer from './hadith/store/reducer/checkToSearch';
import searchResultReducer from './hadith/store/reducer/SearchResult/searchResult';
import totalPerBookReducer from './hadith/store/reducer/SearchResult/totalPerBook';
import isSearchingReducer from './hadith/store/reducer/SearchResult/isSearching';
import openAndCloseReducer from './hadith/store/reducer/ComboKitabBab/openAndClose';
import arabicKeyboardReducer from './hadith/store/reducer/Keyboard/arabicKeyboard';
import inputValueReducer from './hadith/store/reducer/SearchResult/inputValue';
import selectionIndexReducer from './hadith/store/reducer/SearchResult/selectionIndex';
import showNoteReducer from './hadith/store/reducer/Note/showNote';
import switchNoteModeReducer from './hadith/store/reducer/Note/switchNoteMode';
import biographyReducer from './hadith/store/reducer/Biography/biography';
import infoReducer from './hadith/store/reducer/Info/info';
import fontSettingReducer from './hadith/store/reducer/Font/fontSetting';
import displaySanadReducer from './hadith/store/reducer/Sanad/displaySanad';
import sanadDataReducer from './hadith/store/reducer/Sanad/sanadData';
import sanadPositionReducer from './hadith/store/reducer/Sanad/sanadPosition';
import showProfileReducer from './hadith/store/reducer/Sanad/showProfile';
import totalHadithReducer from './hadith/store/reducer/TotalHadith/totalHadith';
import showDetailsColorReducer from './hadith/store/reducer/DetailsColor/showDetailsColor';
import diagramSanadReducer from './hadith/store/reducer/Sanad/diagramSanad';
import similarReducer from './hadith/store/reducer/Similar/similar';
import displaySimilarReducer from './hadith/store/reducer/Similar/displaySimilar';
import backFromSimilarReducer from './hadith/store/reducer/Similar/backFromSimilar';
import queryValueReducer from './hadith/store/reducer/RawiSearch/queryValue';
import tabBodyHeightRefReducer from './hadith/store/reducer/RawiSearch/tabBodyHeightRef';
import resultOfSearchRawiReducer from './hadith/store/reducer/RawiSearch/resultOfSearchRawi';
import clickedNarratorReducer from './hadith/store/reducer/RawiSearch/clickedNarrator';
import rerenderTriggerReducer from './hadith/store/reducer/RawiSearch/rerenderTrigger';
import AllNotesDataReducer from './hadith/store/reducer/Note/AllNotesData';
import tableOfBookmarksReducer from './hadith/store/reducer/Bookmark/tableOfBookmarks';
import deletionPendingReducer from './hadith/store/reducer/Bookmark/deletionPending';
import openHadithTermReducer from './hadith/store/reducer/HadithTerm/openHadithTerm';
import themeSettingReducer from './hadith/store/reducer/Theme/themeSetting';
import tabDialogReducer from './hadith/store/reducer/DialogForTab/tabDialog';
import dialogProfileRawiReducer from './hadith/store/reducer/Sanad/dialogProfileRawi';
import lightDarkSwitchReducer from './hadith/store/reducer/Theme/lightDarkSwitch';
import aiSummaryReducer from './hadith/store/reducer/aiSummary';
// import swipeableIndexReducer from './hadith/store/reducer/SwipeableIndex/swipeableIndex';

const rootReducer = combineReducers({
    mainBooksData: mainBooksDataReducer,
    kitabData: kitabDataReducer,
    babData: babDataReducer,
    valueOfShownKitab: valueOfShownKitabReducer,
    disableNavButton: disableNavButtonReducer,
    otherNumberData: otherNumberDataReducer,
    snackBarsSetting: snackBarsSettingReducer,
    currentTable: currentTableReducer,
    numberEachBook: numberEachBookReducer,
    indexTab: indexTabReducer,
    expandedPanel: expandedPanelReducer,
    controlRadioCheck: controlRadioCheckReducer,
    inputComboValue: inputComboValueReducer,
    bookmarkContent: bookmarkContentReducer,
    checkToSearch: checkToSearchReducer,
    searchResult: searchResultReducer,
    totalPerBook: totalPerBookReducer,
    isSearching: isSearchingReducer,
    openAndClose: openAndCloseReducer,
    arabicKeyboard: arabicKeyboardReducer,
    inputValue: inputValueReducer,
    selectionIndex: selectionIndexReducer,
    showNote: showNoteReducer,
    biography: biographyReducer,
    info: infoReducer,
    fontSetting: fontSettingReducer,
    displaySanad: displaySanadReducer,
    sanadData: sanadDataReducer,
    sanadPosition: sanadPositionReducer,
    showProfile: showProfileReducer,
    totalHadith: totalHadithReducer,
    showDetailsColor: showDetailsColorReducer,
    diagramSanad: diagramSanadReducer,
    similar: similarReducer,
    displaySimilar: displaySimilarReducer,
    backFromSimilar: backFromSimilarReducer,
    queryValue: queryValueReducer,
    tabBodyHeightRef: tabBodyHeightRefReducer,
    resultOfSearchRawi: resultOfSearchRawiReducer,
    clickedNarrator: clickedNarratorReducer,
    rerenderTrigger: rerenderTriggerReducer,
    switchNoteMode: switchNoteModeReducer,
    AllNotesData: AllNotesDataReducer,
    tableOfBookmarks: tableOfBookmarksReducer,
    deletionPending: deletionPendingReducer,
    openHadithTerm: openHadithTermReducer,
    themeSetting: themeSettingReducer,
    tabDialog: tabDialogReducer,
    dialogProfileRawi: dialogProfileRawiReducer,
    lightDarkSwitch: lightDarkSwitchReducer,
    aiSummary: aiSummaryReducer
    // swipeableIndex: swipeableIndexReducer
});

const store = createStore(rootReducer);

ReactDOM.render(<Provider store={store}><Router><App /></Router></Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
