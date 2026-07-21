import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, withTheme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

import { connect } from 'react-redux';
import * as actionTypes from '../../store/action';
import sender from '../../sender/senderDataRequest';
import { switchServer, authFetch } from '../../sender/api';
import { closeDialogTab } from '../../fungsi/closeDialogTab';
import {getCompactKitabRealName} from '../../fungsi/getKitabRealName';
import { getCompactImamName } from '../../fungsi/getImamName';
import { currentSizeId } from '../../store/currentScreenSize';
import arrayOfKitabsName from '../../store/arrayOfKitabsName';

import { withRouter, matchPath } from "react-router";


const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    width: '100%',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    marginBottom: theme.spacing(2),
    width: '100vh',
  },
});

class TextFields extends React.Component {

  shouldComponentUpdate(nextProps) {
    if (this.props.theme.palette.type !== nextProps.theme.palette.type) {
      return true;
    }
    if (this.props.id === 'bookmarkTitleForLoad' && this.props.child.length !== nextProps.child.length ||
      this.props.id === 'bookmarkExistTitle' && this.props.child.length !== nextProps.child.length) {
      return true;
    } else if (this.props.text === nextProps.text) {
      return false;
    } else {
      return true;
    }
  };

  componentDidUpdate(prevProps) {
    if (this.props.id === 'bookmarkTitleForLoad') { // only if titleForLoad updated
      if (prevProps.text !== this.props.text) { // only if its title change is different
        if (this.props.text) { // only if there is title shown in titleForLoad
          const token = localStorage.getItem('token');
          if (token) {
              authFetch(switchServer + 'bookmarks/' + this.props.text)
                .then(res => {
                  if (!res.ok) {
                    throw new Error('Failed to fetch title list');
                  }
                  return res.json();
                })
                .then(resData => {
                  const arrayOfBookName = Object.keys(resData);
                  arrayOfBookName.sort((a, b) => arrayOfKitabsName.indexOf(a) - arrayOfKitabsName.indexOf(b));
                  // the code below could be omitted, it's just more bug safe
                  // the only possible cause is when user adding title
                  // and kitab name directly through bookmark.json
                  // with empty value or empty array
                  let booksName, posNumber;
                  for (let i = 0, n = arrayOfBookName.length; i < n; i++) {
                    const name = arrayOfBookName[i];
                    if (resData[name][0]) {
                      booksName = name;
                      posNumber = resData[name][0];
                      break;
                    }
                    if (i == (n - 1)) { return; }
                  }
                  // the code above could be omitted, it's just more bug safe
                  if (prevProps.text === '' && this.props.history.action === 'POP') {
                    // ga usah bingung lg ini kode yg bener2 menghandle pertamakali mengunjungi url bookmark
                    // hanya saja ini tahap ketiga fungsinya untuk fetch target hadits sesuai url,
                    // sedangkan sebelumnya menampilkan left drawer dan option di dropdown sudah dihandle 
                    // di TabDialog.js lalu InputAndCombo.js saat componentDidMount
                    // kode ini untuk menghandle jika pertama kali mengunjungi url by type on address bar then press enter
                    // apabila url nya menunjukkan untuk membuka hadits bookmark nomer tertentu
                    const matchBookmark = matchPath(this.props.location.pathname, {
                      path: '/bookmark/:title/:bookmark_number/:imam/:hadith_number',
                      exact: true,
                      strict: true,
                      sensitive: true,
                    });
                    if (matchBookmark) { // null jika url tidak match
                      sender('loadCustomData', [getCompactKitabRealName(matchBookmark.params.imam), matchBookmark.params.hadith_number, matchBookmark.params.bookmark_number, actionTypes.BOOKMARKDATA]);
                    } else {
                      sender('loadCustomData', [booksName, posNumber, 1, actionTypes.BOOKMARKDATA]);
                    }
                  } else {
                    sender('loadCustomData', [booksName, posNumber, 1, actionTypes.BOOKMARKDATA]);
                  }

                  // set url accordinglly setiap kali select option di dropdown Tampilkan bookmark
                  this.props.history.replace(`/bookmark/${this.props.text}/1/${getCompactImamName(booksName)}/${posNumber}`);
                   

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
                  if (totalHadits !== this.props.totalRow) {
                    this.props.onDispatchCountRow(totalHadits);
                  }
                  // store bookmark list into redux state for further use
                  // in AppBar to navigate through each hadits
                  this.props.onStoreBookmarkList(easyToFetch);
                  // store original data from server to redux state
                  // for displaying table/list of bookmarks
                  this.props.onStoreBookmarkTable(resData);
                  // set state current shown table name
                  this.props.onCurrentShownTable(this.props.text);
                  // collapse the opened panel in kedudukan or in tema
                  if (this.props.expandKedudukan !== false && this.props.expandKedudukan !== null ||
                    this.props.expandTema !== false && this.props.expandTema !== null) {
                    this.props.onExpandingPanel([false, false]);
                  }
                  this.props.collapsePanelHandler(false);
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

  handleChange = event => {
    switch (this.props.id) {
      case 'bookmarkNewTitle': // new title
        this.props.onNewTitleChanged(event.target.value);
        break;
      case 'bookmarkExistTitle': // exist title
        this.props.onExistTitleChanged(event.target.value);
        break;
      case 'bookmarkTitleForLoad': // Title For Load
        this.props.onTitleForLoadChanged(event.target.value); // show selected title
        break;
      case 'rawiSearchNama': // Rawi Name
        this.props.onNameValueChanged(event.target.value);
        break;
      case 'rawiSearchKunyah': // Rawi Kunyah
        this.props.onKunyahValueChanged(event.target.value);
        break;
      case 'rawiSearchKalangan': // Rawi Kalangan
        this.props.onKalanganValueChanged(event.target.value);
        break;
      case 'rawiSearchLevel': // Rawi Level
        this.props.onLevelValueChanged(event.target.value);
        break;
      default:
        break;
    }
  };

  handleEnterKey = event => {
    if (event.key === 'Enter') {
      event.preventDefault();
      switch (this.props.id) {
        case 'bookmarkNewTitle':
          if (!this.props.cannotSave) { // if this.props.cannotSave is false it means able to save
            this.props.handleSave(); // handler in InputAndCombo.js
          }
          break;
        case 'rawiSearchNama':
        case 'rawiSearchKunyah':
          this.props.handleSearch();
          break;
        default:
          break;
      }
    }
  };

  render() {
    const { classes, id, require, select, watermark, text, helper } = this.props;

    return (
      <form className={classes.container} noValidate autoComplete="off">
        <TextField
          id={id}
          required={require}
          select={select}
          label={watermark}
          margin='none'
          className={classes.textField}
          placeholder={watermark}
          value={text}
          helperText={helper}
          onChange={this.handleChange}
          onKeyPress={this.handleEnterKey}
        >
          {this.props.child}
        </TextField>
      </form>
    );
  };
};

TextFields.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => {
  return {
    totalRow: state.mainBooksData.TotalRow,
    expandKedudukan: state.expandedPanel.expandKedudukan,
    expandTema: state.expandedPanel.expandTema
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onNewTitleChanged: (str) => dispatch({ type: actionTypes.NEWTITLE, value: str }),
    onExistTitleChanged: (str) => dispatch({ type: actionTypes.EXISTTITLE, value: str }),
    onTitleForLoadChanged: (str) => dispatch({ type: actionTypes.TITLEFORLOAD, value: str }),
    onDispatchCountRow: (rows) => dispatch({ type: actionTypes.TOTALROW, totalRow: rows }),
    onStoreBookmarkList: (arRay) => dispatch({ type: actionTypes.BOOKMARKLIST, value: arRay }),
    onStoreBookmarkTable: (obj) => dispatch({ type: actionTypes.BOOKMARKTABLE, value: obj }),
    onCurrentShownTable: (table) => dispatch({ type: actionTypes.CURRENTTABLE, currentTable: table }),
    onExpandingPanel: (arrAy) => dispatch({ type: actionTypes.EXPANDCOLLAPSE, nameOrfalse: arrAy }),
    onNameValueChanged: (str) => dispatch({ type: actionTypes.NAMEVALUE, name: str }),
    onKunyahValueChanged: (str) => dispatch({ type: actionTypes.KUNYAHVALUE, kunyah: str }),
    onKalanganValueChanged: (str) => dispatch({ type: actionTypes.KALANGANVALUE, kalangan: str }),
    onLevelValueChanged: (str) => dispatch({ type: actionTypes.LEVELVALUE, level: str }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(withTheme(withRouter(TextFields))));