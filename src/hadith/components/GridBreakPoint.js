import React, { useState, useEffect, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Tabs from './Tabs';
import BookIcon from '@material-ui/icons/Book';
import RankingIcon from '@material-ui/icons/Star';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import ListHadithIcon from '@material-ui/icons/ImportContacts';
import ChainIcon from '@material-ui/icons/DeviceHub';
import SimilarIcon from '@material-ui/icons/Widgets';
import EmailIcon from '@material-ui/icons/Email';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Hidden from '@material-ui/core/Hidden';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';

import Books from "./items/Books";
import { connect } from 'react-redux';
import * as actionTypes from '../store/action';
import * as detailsPerBook from '../store/totalHaditsEachBook';
import arrayOfKitabsName from '../store/arrayOfKitabsName';
import { currentSizeId } from '../store/currentScreenSize';
import { closeDialogTab } from '../fungsi/closeDialogTab';
import { getCompactImamName } from '../fungsi/getImamName';
import replaceDerajat from '../fungsi/replaceDerajat';
import GradeContainer from './Grade/Container/GradeContainer';
import PanelBottom from './items/PanelBottom';
import TextHadits from './items/TextHadits';
import ExpansionPanel from './ExpansionPanel';
import iconLabelTema from './items/IconLabelTema';
import { IconSearchRawi, IconSearchResult, IconTematis } from './items/IconsMDI';
import InputAndCombo from './Bookmark/InputAndCombo';
import SelectBook from './SearchResult/SelectBooks';
import Resizable from 're-resizable';
import Sanad from './Sanad/Containers/Sanad';
import Similar from './Similar/Container/Similar';
import RawiSearch from './RawiSearch/RawiQuery';
import sender, { setDispatchMainContent, setStoreDispatch } from '../sender/senderDataRequest';
import { switchServer, authFetch } from '../sender/api';
import getKitabName from '../fungsi/getKitabName';
import {getCompactKitabRealName} from '../fungsi/getKitabRealName';
import getClassFullName from '../fungsi/getClassificationName';
import RankWrapper from './items/RankWrapper';
import NavComponent from './NavComponent/NavComponent';
import setCurrentScreenSize from '../store/currentScreenSize';
import setOpenedTableName from '../store/openedTableName';
import ReportForm from './Report/ReportForm';
import AiSummary from './AiSummary/AiSummary';

import { useLocation, useHistory, useRouteMatch } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  root: {
    order: 3,
    display: 'flex',
    flexDirection: 'row',
    flex: '1 1 auto',
    height: '79.4%'
  },
  tabsWidth: {
    display: 'flex',
    width: '20%',
    flexDirection: 'column',
    flex: '1 1 auto',
    height: '100%'
    // [theme.breakpoints.up('sm')]: {
    // },
  },
  haditsWidth: {
    display: 'flex',
    flexDirection: 'column',
    flex: '2 1 auto',
    height: '100%',
    width: '60%',
    padding: '0 3px'
  },
  showHiddenTabWrapper: {
    order: 2,
    backgroundColor: theme.palette.background.paper
  },
  showHiddenLeftTab: {
    width: 30,
    color: theme.palette.primary.main,
    backgroundColor: theme.palette.grey['200'],
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    marginLeft: '-3px'
  },
  showHiddenRightTab: {
    width: 30,
    float: 'right',
    color: theme.palette.primary.main,
    backgroundColor: theme.palette.grey['200'],
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    marginRight: '-3px'
  },
  horDivider: {
    order: 3,
    width: '100%',
    height: 1
  },
  customContainer: {
    flexDirection: 'row',
    height: '100%',
    backgroundColor: theme.palette.background.paper
  },
  resizerContainer: {
    display: 'flex',
    flexDirection: 'column',
    maxHeight: '95%',
  },
  grow: {
    flex: '1 1 43.4%',
    textAlign: 'center',
    '& > button': {
      color: '#3F51B5'
    }
  }
}));

// Be careful using this hook. It only works because the number of
// breakpoints in theme is static. It will break once you change the number of
// breakpoints. See https://reactjs.org/docs/hooks-rules.html#only-call-hooks-at-the-top-level
const useWidth = () => {
  const theme = useTheme();
  const keys = [...theme.breakpoints.keys].reverse();
  return (
    keys.reduce((output, key) => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const matches = useMediaQuery(theme.breakpoints.up(key));
      return !output && matches ? key : output;
    }, null) || 'xs'
  );
}

// const areEqual = (prev, next) => {
//   if (prev.openNote !== next.openNote) {
//     return true;
//   }
//   return false;
// }

// COMPONENT START
const GridBreakPoint = props => {

  const [pixelHeight, setPixelHeight] = useState('83%');
  const [percentHeight, setPercentHeight] = useState(76);
  const [hideLeftTab, setHideLeftTab] = useState(false);
  const [hideRightTab, setHideRightTab] = useState(true);
  const [showLeftTabButton, setShowLeftTabButton] = useState(true);
  const [showRightTabButton, setShowRightTabButton] = useState(false);

  const refOfGridRoot = useRef(null);
  const refResizable = useRef(null);

  const windowWidth = useWidth();

  const theme = useTheme();
  const smallDown = useMediaQuery(theme.breakpoints.down('sm'));

  const isSmallDownChangesRef = useRef();

  useEffect(() => {
    // for camparison prev and current val
    isSmallDownChangesRef.current = smallDown;
  });
  const prevSmallDownValue = isSmallDownChangesRef.current;

  useEffect(() => {
    setCurrentScreenSize(smallDown, windowWidth);
  }, [smallDown, windowWidth]);

  useEffect(() => {
    if (props.openProfile) {
      if (smallDown) {
        setTimeout(() => {
          props.onShowProfile(false);
          props.onShowTabDialog(true, 'right');
          props.onShowDialogProfileRawi('profileRawi');
        }, 1000);
      }
    }
  }, [smallDown, props.openProfile]);

  useEffect(() => {
    setStoreDispatch(props.dispatch);
  }, []);

  useEffect(() => {
    const propsForMainContent = () => {
      return {
        onDispatchMainData: props.onDispatchMainData,
        onDispatchCustomData: props.onDispatchCustomData,
        onShowProfile: props.onShowProfile,
        onShowDetailsColor: props.onShowDetailsColor,
        onNoteExist: props.onNoteExist,
        onShowNote: props.onShowNote,
        // onStoreNoteValue: props.onStoreNoteValue,
        rightTab: props.rightTab,
        openDetailsColor: props.openDetailsColor,
        onSelectSimilar: props.onSelectSimilar,
        whatDataIsShown: props.whatDataIsShown,
        selectedSimilar: props.selectedSimilar,
        openProfile: props.openProfile,
        noteExist: props.noteExist,
        openNote: props.openNote,
        windowWidth: windowWidth,
        hideRightTab: hideRightTab,
        // nomer: props.nomer
      };
    }

    setDispatchMainContent(propsForMainContent);
  }, [
      props.rightTab,
      props.openDetailsColor,
      props.whatDataIsShown,
      props.selectedSimilar,
      props.openProfile,
      props.noteExist,
      props.openNote,
      windowWidth,
      hideRightTab,
      // props.nomer
    ]);

  useEffect(() => {
    // if (resizeStore.get('horDivider.percentHeight', 76) !== percentHeight) {
    //   setPixelHeight((resizeStore.get('horDivider.percentHeight') / 100) * refOfGridRoot.current.clientHeight);
    //   setPercentHeight(resizeStore.get('horDivider.percentHeight'));
    // };
    props.onSetResizeBoundProfile(refOfGridRoot.current.firstElementChild.firstElementChild);
  }, []);

  useEffect(() => {
    const updateWindowSize = () => {
      const currentPercent = (refResizable.current.resizable.clientHeight / refOfGridRoot.current.clientHeight) * 100;
      if (currentPercent !== percentHeight) {
        setPixelHeight((percentHeight / 100) * refOfGridRoot.current.clientHeight);
      }
      if (props.resultRawi && props.resultRawi.length !== 0) {
        // the purpose of this code is as described by its name,
        // to trigger re-render of RawiResult's height in RawiSearch Tab
        // because without this, the component won't resize itself
        props.onTriggerRenderRawiResult(currentPercent);
      }
    }

    window.addEventListener('resize', updateWindowSize);

    return () => window.removeEventListener('resize', updateWindowSize);
  }, [percentHeight, props.resultRawi]);

  useEffect(() => {
    if (smallDown !== prevSmallDownValue) {
      if (!smallDown) { // if not in small screen
        if (!hideRightTab) {
          switch (props.rightTab) {
            case 1: // sanad tab
              // Get the sanad's data first and then show SanadElement in dispatchSanad of Sanad.js
              if (props.kitabName) {
                const getTheNameOfKitab = getKitabName(props.kitabName);
                sender('loadSanadHadits', ['Sanad' + getTheNameOfKitab, +props.nomer]);
              }
              break;
            case 2:  // similar tab
              // Get the similar's data first and then show similar in dispatchSimilar of similarList.js
              if (props.kitabName) {
                if (props.whatDataIsShown !== actionTypes.SIMILARDATA) {
                  const getTheNameOfKitab = getKitabName(props.kitabName);
                  sender('loadSimilarHadith', ['Banding' + getTheNameOfKitab, +props.nomer]);
                }
              }
              break;
            default:
              break;
          }
        }
      }
    }
  }, [smallDown, hideRightTab, props.rightTab, props.kitabName, props.nomer, props.whatDataIsShown]);

  // useEffect(() => {
  //   resizeStore.set('horDivider', {
  //     percentHeight: percentHeight,
  //   });
  // }, [percentHeight]);

  useEffect(() => {
    if (props.kitab.length !== 0 && props.shownKitab !== props.vSelectedK) {
      props.onSettingShownKitab(props.vSelectedK);
    }
    if (props.bab.length !== 0 && props.shownBab !== props.vSelectedB) {
      props.onSettingShownBab(props.vSelectedB);
    }
  }, [
      props.kitab.length,
      props.shownKitab,
      props.vSelectedK,
      props.bab.length,
      props.shownBab,
      props.vSelectedB
    ]);

  const handleShowHiddenLeftTab = () => {
    switch (windowWidth) {
      case 'xs':
      case 'sm':
        props.onShowTabDialog(true, 'left');
        break;
      default:
        setHideLeftTab(false);
        setHideRightTab(true);
        setShowLeftTabButton(true);
        setShowRightTabButton(false);
        break;
    }
  }

  const matchMain = useRouteMatch({
    path: "/main/:imam/:id",
    strict: true,
    exact: true,
    sensitive: true,
  });
  const matchClass = useRouteMatch({
    path: "/class/:item/:imam/:id",
    strict: true,
    exact: true,
    sensitive: true,
  });
  const matchBookmark = useRouteMatch({
    path: '/bookmark/:title/:bookmark_number/:imam/:hadith_number',
    exact: true,
    strict: true,
    sensitive: true,
  });

  const location = useLocation();

  const history = useHistory();

  useEffect(() => {
    // dieksekusi tiapkali history actionnya POP,
    // POP terjadi ketika pertama kali load page (did mount) 
    // dan ketika klik tombol back pada browser atau back android
    // untuk mengecek url, jika mengarah pada url tertentu
    // maka tampilkan hadith/komponent yang terkait
    if (history.action === 'POP') {
      if (matchMain) {
        const kitab = getCompactKitabRealName(matchMain.params.imam);
        const hNumber = matchMain.params.id;
        // will be use in senderDataRequest.js for saving lastread
        setOpenedTableName(kitab);
        sender('loadMainData', [kitab, hNumber]);
        // set state current shown table name
        props.onCurrentShownTable(kitab);
      } else if (matchClass) {
        const kitab = getCompactKitabRealName(matchClass.params.imam);
        const panel = getClassFullName(matchClass.params.item);
        const hNumber = matchClass.params.id;
        // will be use in senderDataRequest.js for saving lastread
        setOpenedTableName(panel);
        // kedudukan dan tema digabung jd satu chanel 'classificationData'
        // Inside array example > [ShahihBukhari, 5, KumpulanAlQuran]
        sender('classificationData', [kitab, hNumber, panel]);
        // set state current shown table name
        props.onCurrentShownTable(panel);
        // set state to show number of hadits in each book
        props.onDetailsHaditsPerBooks(detailsPerBook[panel]);
        // Set a delay so that the animation can work
        let tic = 120;
        setTimeout(() => {
            props.onExpandingPanel([panel, false]);
        }, tic);
      } else if (matchBookmark) {
        if (props.listTitle.length) {
          // hanya untuk menghandle klik back button pada browser,
          // karna kalau pertama kali load page (props.listTitle.length nilainya 0) udah ada yg handle
          const token = localStorage.getItem('token');
          if (token) {
            if (matchBookmark.params.title === props.titleForLoad) {
              // masuk sini kalau title di prev url masih sama dengan saat ini (tidak pindah item dropdown)
              sender('loadCustomData', [getCompactKitabRealName(matchBookmark.params.imam), matchBookmark.params.hadith_number, matchBookmark.params.bookmark_number, actionTypes.BOOKMARKDATA]);
              // collapse the opened panel in kedudukan or in tema
              if (props.expandKedudukan !== false && props.expandKedudukan !== null ||
                props.expandTema !== false && props.expandTema !== null) {
                props.onExpandingPanel([false, false]);
              }
              if (currentSizeId === 'xs') {
                closeDialogTab(false, 'left');
              }
            } else {

                authFetch(switchServer + 'bookmarks/' + matchBookmark.params.title)
                  .then(res => {
                    if (!res.ok) {
                      throw new Error('Failed to fetch title list');
                    }
                    return res.json();
                  })
                  .then(resData => {
                    const arrayOfBookName = Object.keys(resData);
                    arrayOfBookName.sort((a, b) => arrayOfKitabsName.indexOf(a) - arrayOfKitabsName.indexOf(b));
                  
                    sender('loadCustomData', [getCompactKitabRealName(matchBookmark.params.imam), matchBookmark.params.hadith_number, matchBookmark.params.bookmark_number, actionTypes.BOOKMARKDATA]);
                      
                    let easyToFetch = [];
                    for (let idx = 0, n = arrayOfBookName.length; idx < n; idx++) {
                      const kitab = arrayOfBookName[idx];
                      const sortByNumber = [...resData[kitab]];
                      sortByNumber.sort((a, b) => a - b);
                      for (let i = 0, n = sortByNumber.length; i < n; i++) {
                        const num = sortByNumber[i];
                        easyToFetch.push({ book: kitab, no: num });
                      }
                    }
                    const totalHadits = easyToFetch.length;
                    if (totalHadits !== props.totalRow) {
                      props.onDispatchCountRow(totalHadits);
                    }
                    // store bookmark list into redux state for further use
                    // in AppBar to navigate through each hadits
                    props.onStoreBookmarkList(easyToFetch);
                    // store original data from server to redux state
                    // for displaying table/list of bookmarks
                    props.onStoreBookmarkTable(resData);
                    // set state current shown table name
                    props.onCurrentShownTable(matchBookmark.params.title);
                    // set selected item bookmark dropdown
                    props.onTitleForLoadChanged(matchBookmark.params.title);
                    // collapse the opened panel in kedudukan or in tema
                    if (props.expandKedudukan !== false && props.expandKedudukan !== null ||
                      props.expandTema !== false && props.expandTema !== null) {
                      props.onExpandingPanel([false, false]);
                    }
                    // props.collapsePanelHandler(false); // di comment aja dlu karena tidak bisa di akses setState nya
                    if (currentSizeId === 'xs') {
                      closeDialogTab(false, 'left');
                    }
                  })
                  .catch(err => console.log('load bookmark', err));
            }
          }
        }
      }
    }
  }, [location.pathname]);

  const handleShowHiddenRightTab = () => {
    switch (windowWidth) {
      case 'xs':
      case 'sm':
        props.onShowTabDialog(true, 'right');
        break;
      default:
        setHideLeftTab(true);
        setHideRightTab(false);
        setShowLeftTabButton(false);
        setShowRightTabButton(true);
        break;
    }
  }

  const classes = useStyles();
  // REPLACE NUMBER FROM DATABASE TO BECOME DERAJAT
  const firstGrade = replaceDerajat(props.derajat1);
  const secondGrade = replaceDerajat(props.derajat2);

  return (
    <div
      ref={refOfGridRoot}
      className={classes.root}
    >
      <Grid className={classes.customContainer}
        container
        justify='space-evenly'
        color='primary'
      >
        <Hidden smDown mdDown={hideLeftTab}>
          <Grid className={classes.tabsWidth} item>
            <Tabs
              directIon='rtl'
              tooltip={['Daftar buku', 'Berdasar Kedudukan', 'Tematis', 'Bookmarks', 'Hasil cari']}
              icon={[<BookIcon />, <RankingIcon />, <IconTematis />, <BookmarkIcon />, <IconSearchResult />]}
              tabContent={[<Books />,
              <RankWrapper />,
              <ExpansionPanel iconlabel={iconLabelTema} />,
              <InputAndCombo />,
              <SelectBook />]} />
          </Grid>
        </Hidden>
        <Grid className={classes.haditsWidth} item>
          <Resizable
            ref={refResizable}
            className={classes.resizerContainer}
            // style={{ display: 'flex', flexDirection: 'column' }}
            size={{
              width: '100%',
              height: pixelHeight,
            }}
            onResizeStop={(e) => {
              const backToPercent = ((e.y - (window.innerHeight - refOfGridRoot.current.clientHeight)) / refOfGridRoot.current.clientHeight) * 100
              setPixelHeight(refResizable.current.resizable.clientHeight); // pixelHeight + d.height,
              setPercentHeight(backToPercent);
            }}
            enable={{
              top: false,
              right: false,
              bottom: true,
              left: false,
              topRight: false,
              bottomRight: false,
              bottomLeft: false,
              topLeft: false
            }}
            handleStyles={{
              bottom: { height: '20px', bottom: '-10px', zIndex: 1 }
            }}
          >
            <>
              <TextHadits />
              <div style={smallDown ? { display: 'flex' } : undefined} className={classes.showHiddenTabWrapper}>
                <Hidden xsDown lgUp mdUp={showLeftTabButton}>
                  <IconButton
                    className={classes.showHiddenLeftTab}
                    size='small'
                    onClick={handleShowHiddenLeftTab}
                  >
                    <ChevronRightIcon />
                  </IconButton>
                </Hidden>
                {smallDown && <div className={classes.grow}><NavComponent inputStyles={'grid'} /></div>}
                <Hidden xsDown lgUp mdUp={showRightTabButton}>
                  <IconButton
                    className={classes.showHiddenRightTab}
                    size='small'
                    onClick={handleShowHiddenRightTab}
                  >
                    <ChevronLeftIcon />
                  </IconButton>
                </Hidden>
              </div>
              <Divider className={classes.horDivider} />
            </>
          </Resizable>
          <GradeContainer
            firstGrade={firstGrade}
            secondGrade={secondGrade}
            kitabName={getKitabName(props.kitabName)} />
          <PanelBottom />
        </Grid>
        <Hidden smDown mdDown={hideRightTab}>
          <Grid className={classes.tabsWidth} item>
            <Tabs
              directIon='ltr'
              tooltip={['Daftar hadits', 'Sanad', 'Hadits serupa', 'Cari rawi', 'Laporkan']}
              icon={[<ListHadithIcon />, <ChainIcon />, <SimilarIcon />, <IconSearchRawi />, <EmailIcon />]}
              tabContent={[<AiSummary />, <Sanad />, <Similar />, <RawiSearch />, <ReportForm />]} />
          </Grid>
        </Hidden>
      </Grid>
    </div>
  );
}

// GridBreakPoint.propTypes = {
//   classes: PropTypes.object.isRequired,
// };

const mapStateToProps = state => {
  return {
    kitabName: state.mainBooksData.KitabName,
    nomer: state.mainBooksData.Nomer,
    derajat1: state.mainBooksData.Derajat1,
    derajat2: state.mainBooksData.Derajat2,
    vSelectedK: state.mainBooksData.VSelectedK,
    vSelectedB: state.mainBooksData.VSelectedB,
    whatDataIsShown: state.mainBooksData.WhatDataIsShown,
    kitab: state.kitabData.Kitab,
    bab: state.babData.Bab,
    shownKitab: state.valueOfShownKitab.ShownKitab,
    shownBab: state.valueOfShownKitab.ShownBab,
    openNote: state.showNote.openNote,
    noteExist: state.showNote.noteExist,
    rightTab: state.indexTab.rightTab,
    openProfile: state.showProfile.openProfile,
    openDetailsColor: state.showDetailsColor.openDetailsColor,
    selectedSimilar: state.similar.selectedSimilar,
    resultRawi: state.resultOfSearchRawi.resultRawi,
    titleForLoad: state.inputComboValue.titleForLoad,
    listTitle: state.inputComboValue.listTitle,
    expandKedudukan: state.expandedPanel.expandKedudukan,
    expandTema: state.expandedPanel.expandTema,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    dispatch: dispatch,
    onDispatchMainData: (data, typeOfData) => dispatch({
      type: typeOfData,
      result: data,
      dataType: typeOfData
    }),
    onDispatchCustomData: (data, typeOfData, positionForclassificationData) => dispatch({
      type: actionTypes.CLASSIFICATIONDATA,
      result: data,
      dataType: typeOfData,
      pos: positionForclassificationData
    }),
    onSettingShownKitab: (val) => dispatch({ type: actionTypes.SHOWNKITABVALUE, value: val }),
    onSettingShownBab: (val) => dispatch({ type: actionTypes.SHOWNBABVALUE, value: val }),
    onNoteExist: (booLean) => dispatch({ type: actionTypes.NOTEEXIST, exist: booLean }),
    onShowNote: (booLean) => dispatch({ type: actionTypes.SHOWNOTE, open: booLean }),
    onSetResizeBoundProfile: (element) => dispatch({ type: actionTypes.RESIZEBOUND, bound: element }),
    onShowProfile: (booLean) => dispatch({ type: actionTypes.SHOWPROFILE, open: booLean }),
    onShowDetailsColor: (booLean) => dispatch({ type: actionTypes.SHOWDETAILSCOLOR, open: booLean }),
    onSelectSimilar: (str) => dispatch({ type: actionTypes.SELECTEDSIMILAR, select: str }),
    onTriggerRenderRawiResult: (num) => dispatch({ type: actionTypes.TRIGGERRENDERRAWIRESULT, value: num }),
    onShowTabDialog: (booLean, str) => dispatch({ type: actionTypes.TABDIALOG, show: booLean, side: str }),
    // onStoreNoteValue: (str) => dispatch({ type: actionTypes.NOTEVALUE, value: str }),
    onShowDialogProfileRawi: (str) => dispatch({ type: actionTypes.DIALOGPROFILERAWI, show: str }),
    onCurrentShownTable: (table) => dispatch({ type: actionTypes.CURRENTTABLE, currentTable: table }),
    onDetailsHaditsPerBooks: (arrAy) => dispatch({ type: actionTypes.NUMBEREACHBOOKS, arrayOfNumber: arrAy }),
    onExpandingPanel: (arrAy) => dispatch({ type: actionTypes.EXPANDCOLLAPSE, nameOrfalse: arrAy }),
    onDispatchCountRow: (rows) => dispatch({ type: actionTypes.TOTALROW, totalRow: rows }),
    onStoreBookmarkList: (arRay) => dispatch({ type: actionTypes.BOOKMARKLIST, value: arRay }),
    onStoreBookmarkTable: (obj) => dispatch({ type: actionTypes.BOOKMARKTABLE, value: obj }),
    onTitleForLoadChanged: (str) => dispatch({ type: actionTypes.TITLEFORLOAD, value: str }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(GridBreakPoint));
