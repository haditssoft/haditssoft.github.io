import React from 'react';
import { withStyles, withTheme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';

import { connect } from 'react-redux';
import * as actionTypes from '../../store/action';
import { setDispatchSearchCount } from '../../sender/senderDataRequest';
import { switchServer, authFetch } from '../../sender/api';
import OptionSetting from '../OptionSetting/OptionSetting';
import clearData from '../../fungsi/clearData';
import executeRequest from '../../fungsi/sendSearchRequest';
import { setKeyWords, columnName, setColumnName } from '../../store/searchKeywords';
import MenuButton from '../SearchInput/MenuButton';
import SearchButton from '../SearchInput/SearchButton';
import KeyboardButton from '../SearchInput/KeyboardButton';
import LineDivider from '../SearchInput/LineDivider';
import { currentSizeId, isSizeSmall } from '../../store/currentScreenSize';
import { setAllowSwipeRender } from './TextHadits';

import { withRouter, matchPath } from "react-router";

const styles = theme => {
  let bgColor, iconButtonColor;
  if (theme.palette.type === 'dark') {
    bgColor = '#1D1D1D';
  } else {
    iconButtonColor = theme.palette.text.secondary;
  }

  return ({
    root: {
      [theme.breakpoints.up('sm')]: {
        padding: '2px 4px',
      },
      display: 'flex',
      flex: '1 1 28%',
      alignItems: 'center',
      height: '2.1em',
      borderRadius: 3,
      backgroundColor: bgColor
    },
    input: {
      marginLeft: 8,
      flex: 1,
    },
    iconButton: {
      padding: 10,
    },
    ibColor: {
      color: iconButtonColor
    }
  });
};

// this variable meant to hold keywords which have char ' and replaced by ''
// will be used for searching in the back-end
let keywordForSearching = '';
let numberToBeShown = 1; // nomer urutan hadith dari hasil pencarian yg harus di tampilkan

class CustomizedInputBase extends React.Component {

  state = {
    openDrawers: false,
  };

  inputSearchRef = React.createRef();
  searchButtonRef = React.createRef();

  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.theme.palette.type !== nextProps.theme.palette.type) {
      return true;
    }
    if (this.props.searchValue !== nextProps.searchValue) {
      return true;
    } else if (this.state.openDrawers !== nextState.openDrawers) {
      return true;
    }
    return false;
  }

  componentDidMount() {
    setDispatchSearchCount(this.propsForSearchResultCount);

    const matchSearch = matchPath(this.props.location.pathname, {
      path: "/search",
      exact: true,
      strict: false
    });

    if (matchSearch) {
      const queryParams = new URLSearchParams(this.props.location.search);
      const query = queryParams.get('query');
      const mode = queryParams.get('mode');
      const books = queryParams.get('books');


      const idxMode = (mode === 'single') ? 0 : 1;
      const token = localStorage.getItem('token');
      if (token) {
        authFetch(switchServer + 'search-mode', {
          method: 'PUT',
          body: JSON.stringify({ search_mode: idxMode })
        })
          .then(res => {
            if (!res.ok) {
              throw new Error('Failed to save search mode setting');
            }
            return res;
          })
          .catch(err => console.log(err));
      }
      this.props.onRadioModeCariChecked(idxMode);


      if (books !== 'all') {
        this.props.onBookToSearchChecked(actionTypes.CHECKALL, false);
        books.split(',').forEach((val, idx, arr) => {
          const actType = actionTypes['CHECK' + val.toUpperCase()];
          this.props.onBookToSearchChecked(actType, true);
        });
      }

      this.props.onSearchValueChanged(query);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    // kode untuk menghandle ketik search query di address bar kemudian press enter
    if (this.props.history.action === 'POP') {
      if (prevProps.searchValue === '') {
        const matchSearch = matchPath(this.props.location.pathname, {
          path: "/search",
          exact: true,
          strict: false
        });
        if (matchSearch) {
          const queryParams = new URLSearchParams(this.props.location.search);
          const query = queryParams.get('query');
          const no = queryParams.get('no');
          if (this.props.searchValue === query) {
            this.handleClicked(no);
          }
        }
      }
    }
    // kode untuk menghandle ketik search query di address bar kemudian press enter
  }

  propsForSearchResultCount = () => {
    return {
      amountTotal: this.props.amountTotal,
      totalRow: this.props.totalRow,
      searchResult: this.props.searchResult,
      onStoreAmountOfResult: this.props.onStoreAmountOfResult,
      onDispatchCountRow: this.props.onDispatchCountRow,
      onStoreSearchResult: this.props.onStoreSearchResult,
      sendSearchRequest: this.sendSearchRequest,
      onSetSearching: this.props.onSetSearching
    };
  }

  toggleDrawer = (open) => () => {
    this.setState({
      openDrawers: open,
    });
  };

  handleEnterKey = event => {
    if (event.key === 'Enter') {
      if (currentSizeId === 'xs') {
        this.searchButtonRef.current.focus();
      }
      this.handleClicked();
    }
  };

  handleClicked = (evData) => { // evData bisa event bisa jg data. saya hanya tertarik dgn data, yakni ketika dipanggil dari componentDidUpdate
    // this block of code unlikely necessary
    if (currentSizeId === 'xs') {
      setAllowSwipeRender(false);
    }
    // this block of code
    this.props.onLeftTabIndexChanged(4);
    this.props.onClearAmountOfResult();
    this.clearAllBeforeSearching();
    this.props.onClearSearchResult();

    // keyword will be used for highlighting text
    let keyWord = this.inputBase.value;
    // check if keyWord contain arabic in it
    if (/[\u0600-\u06FF]/.test(keyWord)) {
      // check if keyword contain arabic and latin as well then terminate process
      if (/[a-zA-Z]/.test(keyWord)) return;
      // check if it has diacritics
      if (/[\u064B-\u0652]/.test(keyWord)) {
        setColumnName('Arabic');
      } else {
        setColumnName('Gundul');
      }
    } else if (/[a-zA-Z]/.test(keyWord)) {
      // check if keyword contain latin and arabic as well then terminate process
      if (/[\u0600-\u06FF]/.test(keyWord)) return;
      setColumnName('Indonesia');
    } else {
      setColumnName('Indonesia');
    }

    if (keyWord.length) {
      if (keyWord.includes("'")) {
        // back then this line of code was put in the back-end
        // which ran again for the next search and the next after it, and so, and so
        // not so efficient while it can be done just once.
        keywordForSearching = keyWord.replace(/'/g, "''");
      } else {
        keywordForSearching = keyWord;
      }
      // transform into array of keywords
      // because the back-end needs an array
      // even if it just 1 keyword
      if (this.props.radioModeCari === 0) {
        setKeyWords([keyWord]);
        keywordForSearching = [keywordForSearching];
      } else if (this.props.radioModeCari === 1) {
        setKeyWords(keyWord.split(/ |\//g).filter(word => word !== ''));
        keywordForSearching = keywordForSearching.split(/ |\//g).filter(word => word !== '');
      }
    } else {
      setKeyWords([]);
      keywordForSearching = [];
    }

    // jika dipanggil dari componentDidUpdate evData berisi 
    // nomer urutan hadith dari hasil pencarian yg harus di tampilkan
    numberToBeShown = (typeof evData === 'string') ? +evData : 1;

    this.props.onSetSearching(true);
    this.sendSearchRequest('start');
  };

  clearAllBeforeSearching = () => {
    clearData(
      this.props.onClearMainData,
      this.props.onClearKitabData,
      this.props.onClearBabData,
      this.props.onClearOtherNumber
    );
  };

  sendSearchRequest = (trigerBy) => {

    executeRequest([trigerBy,
      this.props.amountBukhari,
      this.props.CHECKBUKHARI,
      this.props.amountMuslim,
      this.props.CHECKMUSLIM,
      this.props.amountTirmidzi,
      this.props.CHECKTIRMIDZI,
      this.props.amountAbuDaud,
      this.props.CHECKABUDAUD,
      this.props.amountNasai,
      this.props.CHECKNASAI,
      this.props.amountIbnuMajah,
      this.props.CHECKIBNUMAJAH,
      this.props.amountDarimi,
      this.props.CHECKDARIMI,
      this.props.amountAhmad,
      this.props.CHECKAHMAD,
      this.props.amountMalik,
      this.props.CHECKMALIK,
      this.props.amountDaruquthni,
      this.props.CHECKDARUQUTHNI,
      this.props.amountIbnuKhuzaimah,
      this.props.CHECKIBNUKHUZAIMAH,
      this.props.amountIbnuHibban,
      this.props.CHECKIBNUHIBBAN,
      this.props.amountAlMustadrak,
      this.props.CHECKALMUSTADRAK,
      this.props.amountSyafii,
      this.props.CHECKSYAFII,
      this.props.searchResult,
      this.props.onCurrentShownTable,
      this.props.expandKedudukan,
      this.props.expandTema,
      this.props.onExpandingPanel,
      columnName,
      keywordForSearching,
      numberToBeShown,
      this.props.radioSearchEndpoint,
      () => this.props.onSetSearching(false)
    ]);

    if (trigerBy === 'start') { // fungsinya agar url diset sekali saja saat pertama enter/klik search
      if (this.props.history.action !== 'POP') {
        // hanya action selain POP untuk menghindari set url ketika user melakukan pencarian
        // dengan paste/ketik manual url /search di address bar kemudian press enter
        let checkedBook = '';
        if (this.props.checkAll) {
          checkedBook = 'all';
        } else {
          checkedBook += this.props.CHECKBUKHARI ? 'bukhari,' : '';
          checkedBook += this.props.CHECKMUSLIM ? 'muslim,' : '';
          checkedBook += this.props.CHECKTIRMIDZI ? 'tirmidzi,' : '';
          checkedBook += this.props.CHECKABUDAUD ? 'abudaud,' : '';
          checkedBook += this.props.CHECKNASAI ? 'nasai,' : '';
          checkedBook += this.props.CHECKIBNUMAJAH ? 'ibnumajah,' : '';
          checkedBook += this.props.CHECKDARIMI ? 'darimi,' : '';
          checkedBook += this.props.CHECKAHMAD ? 'ahmad,' : '';
          checkedBook += this.props.CHECKMALIK ? 'malik,' : '';
          checkedBook += this.props.CHECKDARUQUTHNI ? 'daruquthni,' : '';
          checkedBook += this.props.CHECKIBNUKHUZAIMAH ? 'ibnukhuzaimah,' : '';
          checkedBook += this.props.CHECKIBNUHIBBAN ? 'ibnuhibban,' : '';
          checkedBook += this.props.CHECKALMUSTADRAK ? 'mustadrak,' : '';
          checkedBook += this.props.CHECKSYAFII ? 'syafii,' : '';
          checkedBook = checkedBook.replace(/,$/, '');
        }
        const querySearch = `/search?query=${this.inputBase.value}&mode=${this.props.radioModeCari ? 'multi' : 'single'}&books=${checkedBook}&no=${numberToBeShown}`;
        this.props.history.push(querySearch);
        if (currentSizeId === 'sm' || currentSizeId === 'xs') {
          // disini cukup ganti urlnya saja, nnti akan mentrigger useEffect()
          // di TabDialog.js untuk open/menampilkan drawer
          this.props.history.push('/left', { ref: querySearch });
          // this.props.onShowTabDialog(true, 'left');
        }
      } else {
        // disini cukup ganti urlnya saja, nnti akan mentrigger useEffect()
        // di TabDialog.js untuk open/menampilkan drawer
        this.props.history.push('/left', { ref: this.props.location.pathname + this.props.location.search });
        // this.props.onShowTabDialog(true, 'left');
      }
    }
  };

  handleKeyboardClick = () => {
    // const { currentTarget } = event;
    // at first it use keyboard button as target position
    // but then use googlesearchinput as the target position
    // so that it shows up exactly below it
    this.props.onShowArabicKeyboard(this.inputSearchRef.current, !this.props.openKeyboard);
  };

  handleChanged = (event) => {
    this.props.onSearchValueChanged(event.target.value);
  };

  handleBlurCapture = () => {
    this.props.onSelectionIdxChanged(this.inputBase.selectionStart, this.inputBase.selectionEnd);
  };

  render() {
    const { classes, searchValue } = this.props;

    return (
      <Paper ref={this.inputSearchRef} className={classes.root} elevation={0}>
        <OptionSetting open={this.state.openDrawers} clicked={this.toggleDrawer} />
        <MenuButton toggleDrawer={this.toggleDrawer} />
        <InputBase
          onBlurCapture={this.handleBlurCapture}
          value={searchValue}
          onChange={this.handleChanged}
          onKeyPress={this.handleEnterKey}
          className={classes.input}
          placeholder="Search..."
          inputRef={elm => { this.inputBase = elm }} />
        <SearchButton ref={this.searchButtonRef} handleClicked={this.handleClicked} />
        <LineDivider />
        <KeyboardButton handleKeyboardClick={this.handleKeyboardClick} />
      </Paper>
    );
  }
}

const mapStateToProps = state => {
  return {
    radioModeCari: state.controlRadioCheck.radioModeCari,
    checkAll: state.checkToSearch.checkAll,
    CHECKBUKHARI: state.checkToSearch.checkBukhari,
    CHECKMUSLIM: state.checkToSearch.checkMuslim,
    CHECKTIRMIDZI: state.checkToSearch.checkTirmidzi,
    CHECKABUDAUD: state.checkToSearch.checkAbuDaud,
    CHECKNASAI: state.checkToSearch.checkNasai,
    CHECKIBNUMAJAH: state.checkToSearch.checkIbnuMajah,
    CHECKDARIMI: state.checkToSearch.checkDarimi,
    CHECKAHMAD: state.checkToSearch.checkAhmad,
    CHECKMALIK: state.checkToSearch.checkMalik,
    CHECKDARUQUTHNI: state.checkToSearch.checkDaruquthni,
    CHECKIBNUKHUZAIMAH: state.checkToSearch.checkIbnuKhuzaimah,
    CHECKIBNUHIBBAN: state.checkToSearch.checkIbnuHibban,
    CHECKALMUSTADRAK: state.checkToSearch.checkAlMustadrak,
    CHECKSYAFII: state.checkToSearch.checkSyafii,
    searchResult: state.searchResult.searchResult,
    totalRow: state.mainBooksData.TotalRow,
    amountTotal: state.totalPerBook.amountTotal,
    amountBukhari: state.totalPerBook.amountBukhari,
    amountMuslim: state.totalPerBook.amountMuslim,
    amountTirmidzi: state.totalPerBook.amountTirmidzi,
    amountAbuDaud: state.totalPerBook.amountAbuDaud,
    amountNasai: state.totalPerBook.amountNasai,
    amountIbnuMajah: state.totalPerBook.amountIbnuMajah,
    amountDarimi: state.totalPerBook.amountDarimi,
    amountAhmad: state.totalPerBook.amountAhmad,
    amountMalik: state.totalPerBook.amountMalik,
    amountDaruquthni: state.totalPerBook.amountDaruquthni,
    amountIbnuKhuzaimah: state.totalPerBook.amountIbnuKhuzaimah,
    amountIbnuHibban: state.totalPerBook.amountIbnuHibban,
    amountAlMustadrak: state.totalPerBook.amountAlMustadrak,
    amountSyafii: state.totalPerBook.amountSyafii,
    expandKedudukan: state.expandedPanel.expandKedudukan,
    expandTema: state.expandedPanel.expandTema,
    openKeyboard: state.arabicKeyboard.openKeyboard,
    searchValue: state.inputValue.searchValue,
    radioSearchEndpoint: state.controlRadioCheck.radioSearchEndpoint,
    isSearching: state.isSearching.isSearching
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onNumberChanged: (pos) => dispatch({ type: actionTypes.CHANGENUMBER, position: pos }),
    onOtherNumberChanged: (pos) => dispatch({ type: actionTypes.OTHERNUMBERTOSEARCH, position: pos }),
    onShowInputOtherNumber: (booLean) => dispatch({ type: actionTypes.SHOWINPUTOTHERNUMBER, show: booLean }),
    onStoreSearchResult: (arRay) => dispatch({ type: actionTypes.SEARCHRESULT, rowsResult: arRay }),
    onClearSearchResult: (arRay) => dispatch({ type: actionTypes.CLEARSEARCHRESULT }),
    onDispatchCountRow: (rows) => dispatch({ type: actionTypes.TOTALROW, totalRow: rows }),
    onClearMainData: () => dispatch({ type: actionTypes.CLEARMAINDATA }),
    onClearKitabData: () => dispatch({ type: actionTypes.CLEARKITABDATA }),
    onClearBabData: () => dispatch({ type: actionTypes.CLEARBABDATA }),
    onClearOtherNumber: () => dispatch({ type: actionTypes.CLEAROTHERNUMBER }),
    onStoreAmountOfResult: (actType, sum, count) => dispatch({ type: actType, total: sum, amount: count }),
    onClearAmountOfResult: () => dispatch({ type: actionTypes.CLEARAMOUNT }),
    onSetSearching: (val) => dispatch({ type: actionTypes.SET_SEARCHING, isSearching: val }),
    onLeftTabIndexChanged: (val) => dispatch({ type: actionTypes.INDEXLEFTTAB, index: val }),
    onCurrentShownTable: (table) => dispatch({ type: actionTypes.CURRENTTABLE, currentTable: table }),
    onExpandingPanel: (arrAy) => dispatch({ type: actionTypes.EXPANDCOLLAPSE, nameOrfalse: arrAy }),
    onShowArabicKeyboard: (refer, booLean) => dispatch({
      type: actionTypes.SHOWARABICKEYBOARD,
      target: refer,
      open: booLean
    }),
    onSearchValueChanged: (txt) => dispatch({ type: actionTypes.SEARCHVALUE, value: txt }),
    onSelectionIdxChanged: (start, end) => dispatch({
      type: actionTypes.SELECTIONINDEX,
      startValue: start,
      endValue: end
    }),
    onShowTabDialog: (booLean, str) => dispatch({ type: actionTypes.TABDIALOG, show: booLean, side: str }),
    onBookToSearchChecked: (action, booL) => dispatch({ type: actionTypes[action], checked: booL }),
    onRadioModeCariChecked: (idx) => dispatch({ type: actionTypes.RADIOMODECARICHECKED, checked: idx }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(withTheme(withRouter(CustomizedInputBase))));