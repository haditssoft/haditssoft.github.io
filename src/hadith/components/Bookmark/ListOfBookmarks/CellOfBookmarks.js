import React from 'react';
import { withStyles, withTheme } from '@material-ui/core/styles';
import Collapse from '@material-ui/core/Collapse';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import ClearIcon from '@material-ui/icons/Delete';
import BookmarkBorder from '@material-ui/icons/BookmarkBorder';

import getKitabName from '../../../fungsi/getKitabName';
import { getCompactImamName } from '../../../fungsi/getImamName';
import sender from '../../../sender/senderDataRequest';
import { connect } from 'react-redux';
import {
  BOOKMARKDATA,
  EXPANDCOLLAPSE,
  TOTALROW,
  BOOKMARKLIST,
  BOOKMARKTABLE,
  PUSHTOQUEUE,
  OPENSNACKBARS,
  CHANGENUMBER,
  UNBOOKMARK
} from '../../../store/action';
import arrayOfKitabsName from '../../../store/arrayOfKitabsName';
import showSnackBar from '../../../fungsi/showSnackBar';
import { prepareDeletion } from '../../../fungsi/deleteForSnackBar';
import { renewListTitle } from '../InputAndCombo';
import { closeDialogTab } from '../../../fungsi/closeDialogTab';
import { currentSizeId } from '../../../store/currentScreenSize';

import { withRouter } from "react-router";

export let prevBookmarkData = null; // will filled with object {}
export const setPrevBookmarkData = (val) => {
  prevBookmarkData = val;
}

const styles = {
  root: {
    paddingLeft: 32
  }
};

let newBookmarkData = null;

class CellOfBookmarks extends React.Component {

  shouldComponentUpdate(nextProps) {
    if (this.props.theme.palette.type !== nextProps.theme.palette.type) {
      return true;
    }
    const prevLength = this.props.open.length;
    const nextLength = nextProps.open.length;
    const prevLengthPending = this.props.unBookmark.length;
    const nextLengthPending = nextProps.unBookmark.length;
    if (prevLength < nextLength && nextProps.open[nextLength - 1] === nextProps.savedBookName) {
      return true;
    } else if (prevLength > nextLength &&
      this.props.open.includes(nextProps.savedBookName) &&
      !nextProps.open.includes(nextProps.savedBookName)) {
      return true;
    } else if (this.props.savedBookName !== nextProps.savedBookName) {
      if (this.props.listValue !== nextProps.listValue) {
        return true;
      }
      return true;
    } else if (prevLengthPending < nextLengthPending) {
      if (nextProps.unBookmark[nextProps.unBookmark.length - 1] === nextProps.savedBookName + ' ' + nextProps.listValue) {
        return true;
      }
    } else if (prevLengthPending > nextLengthPending) {
      const collapseID = nextProps.savedBookName + ' ' + nextProps.listValue;
      if (this.props.unBookmark.includes(collapseID) && !nextProps.unBookmark.includes(collapseID)) {
        return true;
      }
    }
    return false;
  }

  handleSelectNote = (savedBookName, listValue, savedPosition) => {
    sender('loadCustomData', [savedBookName, +listValue, savedPosition, BOOKMARKDATA]);
    // set url accordinglly setiap kali klik/tap list item bookmark
    this.props.history.replace(`/bookmark/${this.props.titleForLoad}/${savedPosition}/${getCompactImamName(savedBookName)}/${listValue}`)
    // collapse the opened panel in kedudukan or in tema
    if (this.props.expandKedudukan !== false && this.props.expandKedudukan !== null ||
      this.props.expandTema !== false && this.props.expandTema !== null) {
      this.props.onExpandingPanel([false, false]);
    }
    if (currentSizeId === 'xs') {
      closeDialogTab(false, 'left');
    }
  };

  saveSucceeded = (mess, vari, titleForLoad, method, value) => {
    const message = {
      message: mess,
      variant: vari,
      key: new Date().getTime()
    };
    showSnackBar(this.props.queueSnackBar, message, this.props.openSnackBar,
      this.props.onPushSnackBarsQueue, this.props.onShowHideSnackBars, this.props.messageSnackBar);
    // for bookmark deletion purpose
    if (titleForLoad) {
      prepareDeletion({
        theStore: 'bookmark',
        storeMethod: method,
        theTargetKey: titleForLoad,
        valueToBeSet: value,
        id: message.key,
        // if delete the title then titleForLoad has no '/' on its string means need to update listTitle
        // but if delete the item titleForLoad has '/' which separate between title and book's name
        updateList: titleForLoad.includes('/') ? undefined : () => renewListTitle(titleForLoad)
      });
    };
  };

  handleDeleteItem = (savedBookName, listValue) => {
    // const listValue = this.props.listValue;
    // const savedBookName = this.props.savedBookName;
    prevBookmarkData = JSON.parse(JSON.stringify(this.props.tableBookmark));
    newBookmarkData = JSON.parse(JSON.stringify(this.props.tableBookmark));
    const removeOneItem = newBookmarkData[savedBookName].filter(num => num !== listValue);
    let arrayOfBookName;
    if (removeOneItem.length) { // if after remove one item there are/is still bookmark list use PUT method
      newBookmarkData[savedBookName] = removeOneItem;
      this.saveSucceeded(
        'Menghapus hadits...',
        'warning',
        `${this.props.titleForLoad}/${savedBookName}`,
        'PUT',
        removeOneItem
      );
    } else { // otherwise use delete method
      delete newBookmarkData[savedBookName];
      arrayOfBookName = Object.keys(newBookmarkData);
      // use delete method
      if (arrayOfBookName.length) {
        // there are still other books in this title
        this.saveSucceeded(
          'Menghapus hadits...',
          'warning',
          `${this.props.titleForLoad}/${savedBookName}`
        );
      } else {
        // there are no other books in this title
        // so just remove the title thus need to update props.listTitle manually
        this.saveSucceeded('Menghapus bookmark...', 'warning', this.props.titleForLoad);
      }
    }
    if (!arrayOfBookName) { arrayOfBookName = Object.keys(newBookmarkData) };
    let easyToFetch = [];
    for (let idx = 0, n = arrayOfBookName.length; idx < n; idx++) {
      const kitab = arrayOfBookName[idx];
      for (let i = 0, n = newBookmarkData[kitab].length; i < n; i++) {
        const num = newBookmarkData[kitab][i];
        easyToFetch.push({ book: kitab, no: num });
      }
    }
    const totalHadits = easyToFetch.length;
    if (totalHadits !== this.props.totalRow) {
      this.props.onDispatchCountRow(totalHadits);
    }
    // store bookmark list into redux state for further use
    // in AppBar to navigate through each hadits
    this.props.onStoreBookmarkList(easyToFetch);
    // collapse list item which wanted to be removed
    this.props.onUnBookmark([...this.props.unBookmark, savedBookName + ' ' + listValue]);

    const nameOfKitab = getKitabName(this.props.kitabName);
    if (nameOfKitab === savedBookName) {
      if (this.props.kitabName.includes(listValue)) {
        // deleted hadith and displayed hadith are the same
        // if not in the last position show the next hadith without changing position number
        // otherwise show previous hadith and the position number go down
        if (this.props.totalRow == 1) { return; }
        let pos;
        let getPrevObject;
        if (this.props.totalRow == this.props.changePosition) { // in the last position
          pos = this.props.totalRow - 1;
          const getIndexPrevObject = easyToFetch.length;
          if (getIndexPrevObject !== 0) {
            getPrevObject = easyToFetch[getIndexPrevObject - 1];
          } else {
            return;
          }
        } else { // NOT in the last position
          pos = this.props.changePosition;
          getPrevObject = easyToFetch[this.props.changePosition - 1];
        }
        sender('loadCustomData', [getPrevObject.book, getPrevObject.no, pos, BOOKMARKDATA]);
      } else {
        // deleted hadith and displayed hadith are not the same but they share the same kitab
        // check if index position of deleted hadith higher or lower than displayed hadith
        const getDisplayedNumber = this.props.kitabName.replace(/\D/g, '');
        if (+getDisplayedNumber > +listValue) {
          // just change the position
          this.props.onNumberChanged(this.props.changePosition - 1);
        }
      }
    } else {
      // because deleted hadith and displayed hadith aren't share the same kitab
      // for that check each index of kitab to get to know which one is lower which one is higher
      const indexDeleted = arrayOfKitabsName.indexOf(savedBookName);
      const indexShownHadith = arrayOfKitabsName.indexOf(nameOfKitab);
      if (indexDeleted < indexShownHadith) {
        // just change the position
        this.props.onNumberChanged(this.props.changePosition - 1);
      }
    }
  }

  handleTransitionEnd = () => {
    if (newBookmarkData) {
      // store removed-one data from tableBookmark to redux state
      // for displaying table/list of bookmarks
      this.props.onStoreBookmarkTable(newBookmarkData);
      newBookmarkData = null;
    }
  }

  render() {
    const { classes, index, listValue, open, savedBookName, savedPosition, unBookmark } = this.props;

    return (
      <Collapse
        key={index}
        in={open.includes(savedBookName) && !unBookmark.includes(savedBookName + ' ' + listValue)}
        timeout='auto'
        appear
        mountOnEnter
        unmountOnExit
        onExited={this.handleTransitionEnd}
      >
        <List dense component='div' disablePadding>
          <ListItem
            className={classes.root}
            disableGutters
            divider
            button
            onClick={() => this.handleSelectNote(savedBookName, listValue, savedPosition)}
          >
            <ListItemIcon>
              <BookmarkBorder />
            </ListItemIcon>
            <ListItemText
              primaryTypographyProps={{ variant: 'body2', component: 'span', gutterBottom: false, color: 'textPrimary' }}
              primary={listValue}
            />
            <ListItemSecondaryAction>
              <IconButton
                onClick={() => this.handleDeleteItem(savedBookName, listValue)}
                size='small' edge='end' aria-label='delete-bookmark-item'
              >
                <ClearIcon fontSize='inherit' />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        </List>
      </Collapse>
    );
  }
}

const mapStateToProps = state => {
  return {
    tableBookmark: state.tableOfBookmarks.tableBookmark,
    expandKedudukan: state.expandedPanel.expandKedudukan,
    expandTema: state.expandedPanel.expandTema,
    titleForLoad: state.inputComboValue.titleForLoad,
    totalRow: state.mainBooksData.TotalRow,
    changePosition: state.mainBooksData.changePosition,
    openSnackBar: state.snackBarsSetting.openSnackBar,
    queueSnackBar: state.snackBarsSetting.queueSnackBar,
    messageSnackBar: state.snackBarsSetting.messageSnackBar,
    kitabName: state.mainBooksData.KitabName,
    unBookmark: state.deletionPending.unBookmark
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onExpandingPanel: (arrAy) => dispatch({ type: EXPANDCOLLAPSE, nameOrfalse: arrAy }),
    onDispatchCountRow: (rows) => dispatch({ type: TOTALROW, totalRow: rows }),
    onStoreBookmarkList: (arRay) => dispatch({ type: BOOKMARKLIST, value: arRay }),
    onStoreBookmarkTable: (obj) => dispatch({ type: BOOKMARKTABLE, value: obj }),
    onPushSnackBarsQueue: (arRay) => dispatch({ type: PUSHTOQUEUE, queue: arRay }),
    onShowHideSnackBars: (booLean, mess) => dispatch({
      type: OPENSNACKBARS,
      show: booLean,
      message: mess
    }),
    onNumberChanged: (pos) => dispatch({ type: CHANGENUMBER, position: pos }),
    onUnBookmark: (arRay) => dispatch({ type: UNBOOKMARK, delete: arRay })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(withTheme(withRouter(CellOfBookmarks))));