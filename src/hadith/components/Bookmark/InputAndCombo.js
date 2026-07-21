import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, withTheme } from '@material-ui/core/styles';
// import Divider from '@material-ui/core/Divider';
import MenuItem from '@material-ui/core/MenuItem';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';

import InputJudulBookmark from '../items/TextField';
import RadioButton from '../items/RadioButton';
import * as actionTypes from '../../store/action';
import { connect } from 'react-redux';
import getKitabName from '../../fungsi/getKitabName';
import showSnackBar from '../../fungsi/showSnackBar';
import { switchServer, authFetch } from '../../sender/api';
import clearData from '../../fungsi/clearData';
import { prepareDeletion } from '../../fungsi/deleteForSnackBar';
import SaveButton from './ButtonComponents/SaveButton';
import DeleteButton from './ButtonComponents/DeleteButton';
import TableBookmarks from './ListOfBookmarks/TableBookmarks';

import { withRouter, matchPath } from "react-router";


const styles = theme => ({
  root: {
    display: 'flex',
    flexFlow: 'column',
    backgroundColor: theme.palette.background.paper,
  },
  sectionOne: {
    margin: theme.spacing(1),
  },
  sectionTwo: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    margin: theme.spacing(1),
  },
  sectionThree: {
    margin: theme.spacing(1),
  },
  summaryHight: {
    minHeight: 0,
    height: '32px',
    padding: 0,
    '&$expanded': {
      minHeight: 0
    },
  },
  expanded: {},
  detailsPadd: {
    padding: '0 20px 16px'
  },
  getRidLine: {
    '&:before': {
      height: 0
    }
  }
});

export let renewListTitle = null;

class InputAndCombo extends React.Component {
  state = {
    name: false
  };

  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.theme.palette.type !== nextProps.theme.palette.type) {
      return true;
    }
    if (this.props.kitabName !== nextProps.kitabName && nextProps.kitabName !== '') {
      return false;
    } else if (this.props.titleForLoad !== nextProps.titleForLoad) {
      return true;
    } else if (this.props.newTitle !== nextProps.newTitle) {
      return true;
    } else if (this.props.existTitle !== nextProps.existTitle) {
      return true;
    } else if (this.props.listTitle.length !== nextProps.listTitle.length) {
      return true;
    } else if (this.props.radioBookmark !== nextProps.radioBookmark) {
      return true;
    } else if (this.state.name !== nextState.name) {
      return true;
    } else if (Object.values(this.props.tableBookmark).join('') !== Object.values(nextProps.tableBookmark).join('')) {
      return true;
    }
    return false;
  }

  componentDidMount() {
    if (!this.props.listTitle.length) {
      const token = localStorage.getItem('token');
      if (token) {
        authFetch(switchServer + 'bookmarks')
          .then(res => {
            if (!res.ok) {
              throw new Error('Failed to fetch title list');
            }
            return res.json();
          })
          .then(resData => {
            let arrayOfTitle = [];
            if (Array.isArray(resData)) {
              arrayOfTitle = resData;
            } else {
              arrayOfTitle = Object.keys(resData || {});
            }
            this.props.onStoreTitleList(arrayOfTitle);
            
            if (this.props.history.action === 'POP') {
              const matchBookmark = matchPath(this.props.location.pathname, {
                path: '/bookmark/:title/:bookmark_number/:imam/:hadith_number',
                exact: true,
                strict: true,
                sensitive: true,
              });
              if (matchBookmark) {
                if (arrayOfTitle.length && arrayOfTitle.includes(matchBookmark.params.title)) {
                  this.props.onTitleForLoadChanged(matchBookmark.params.title);
                }
              }
            }
          })
          .catch(err => console.log('fetch title', err));
      }
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.listTitle.length !== this.props.listTitle.length) {
      renewListTitle = (existTitle) => {
        const newListOfTitle = this.props.listTitle.filter(title => title !== existTitle);
        this.props.onStoreTitleList(/* get rid of deleted title */ newListOfTitle)
      };
    }
    // Deletion of Exist Title only delete the title in config store
    // as for this.props.existTitle it still hold the value of the deleted title
    // it causes the select component as if in state of selecting empty value
    // making its label to be shrinked upside, so change the this.props.existTitle value to ''
    if (!this.props.listTitle.includes(this.props.existTitle)) {
      this.props.onExistTitleChanged('');
      if (!this.props.listTitle.includes(this.props.titleForLoad)) {
        if (this.props.titleForLoad) {
          this.props.onStoreBookmarkTable({});
        }
        this.props.onTitleForLoadChanged('');
      }
    }
  };

  saveSucceeded = (mess, vari, existTitle) => {
    const message = {
      message: mess,
      variant: vari,
      key: new Date().getTime()
    };
    showSnackBar(this.props.queueSnackBar, message, this.props.openSnackBar,
      this.props.onPushSnackBarsQueue, this.props.onShowHideSnackBars, this.props.messageSnackBar);
    // for bookmark deletion purpose
    if (existTitle) {
      prepareDeletion({
        theStore: 'bookmark',
        theTargetKey: existTitle,
        id: message.key,
        updateList: () => {
          const newListOfTitle = this.props.listTitle.filter(title => title !== existTitle);
          this.props.onStoreTitleList(/* get rid of deleted title */ newListOfTitle)
        }
      });
    }
  };

  storeIt = (token, title, booksName, method, lastPost, number) => {
    authFetch(switchServer + 'bookmarks', {
      method: lastPost ? method : "POST",
      body: JSON.stringify({ title: title, items: {book_name: booksName, book_number: number, [lastPost]: number} })
    })
      .then(res => {
        if (!res.ok) {
          throw new Error('Failed to update bookmark');
        }
        if (!this.props.listTitle.includes(title)) {
          const newListOfTitle = [...this.props.listTitle, title];
          this.props.onStoreTitleList(newListOfTitle);
        }
        return this.saveSucceeded('Hadits berhasil dibookmark', 'success');
      })
      .catch(err => console.log('patch bookmark', err));
  }

  getThenStore = (title, booksName, number, token) => {
    authFetch(switchServer + 'bookmarks/' + title + '/' + booksName)
      .then(res => {
        if (res.status === 404) return null;
        if (!res.ok) {
          throw new Error('Failed to check book\'s name in title');
        }
        return res.json();
      })
      .then(resData => {
        if (resData) {
          let arrayData = resData;
          if (!Array.isArray(resData)) {
            arrayData = Object.values(resData);
          }
          if (!arrayData.includes(number)) {
            const lastPost = arrayData.length;
            return this.storeIt(token, title, booksName, 'POST', lastPost, number);
          } else {
            return this.saveSucceeded('Telah ada di bookmark', 'error');
          }
        } else {
          return this.storeIt(token, title, booksName, 'POST', 0, number);
        }
      })
      .catch(err => console.log('getThenStore', err));
  }

  handleSaveClicked = () => {
    const booksName = getKitabName(this.props.kitabName);
    const number = +this.props.kitabName.replace(/\D/g, ''); // convert from string to number
    switch (this.props.radioBookmark) {
      case 0:
        if (booksName) {
          const newTitle = this.props.newTitle;
          const token = localStorage.getItem('token');
          if (token) {
            authFetch(switchServer + 'bookmarks/' + newTitle)
              .then(res => {
                if (res.status === 404) return null;
                if (!res.ok) {
                  throw new Error('Failed to check bookmark exist');
                }
                return res.json();
              })
              .then(resData => {
                if (resData && Object.keys(resData).length > 0) {
                  this.props.onRadioBookmarkChecked(1);
                  this.setState({ name: 'panel2' });
                  this.props.onExistTitleChanged(newTitle);
                  return this.getThenStore(newTitle, booksName, number, token);
                } else {
                  return this.storeIt(token, newTitle, booksName, 'PUT', 0, number);
                }
              })
              .catch(error => console.log('get bookmark', error.message));
          } else {
            alert('Sign in diperlukan untuk membuat dan melihat bookmark');
          }
        }
        break;
      case 1:
        if (booksName) {
          const existTitle = this.props.existTitle;
          const token = localStorage.getItem('token');
          if (token) {
            return this.getThenStore(existTitle, booksName, number, token);
          }
        }
        break;
      default:
        break;
    }
  }

  clearIfTheDeletedIsShown = () => {
    clearData(
      this.props.onClearMainData,
      this.props.onClearKitabData,
      this.props.onClearBabData,
      this.props.onClearOtherNumber
    );
  }

  handleDeleteClicked = () => {
    const existTitle = this.props.existTitle;
    this.saveSucceeded('Menghapus bookmark...', 'warning', existTitle);
  }

  handleChanged = (panel, idx) => (event, expanded) => {
    // if expansion panel clicked, radio and its label being triggered too
    // the event triggered from radio button and its label
    // give the length of children 0, here I don't wannna let them pass
    // I want RadioButton.js take care of them
    if (event.target.children.length === 1) {
      this.setState({ name: expanded ? panel : false });
      if (this.props.radioBookmark !== idx && expanded && event.target.type !== 'radio') {
        // if expansion get clicked doesn't mean radio get clicked too
        // for that check the radio button as well
        this.props.onRadioBookmarkChecked(idx);
      }
    } else if (event.target.type === 'radio') {
      this.setState({ name: expanded ? panel : false });
    }
  }

  handleForceExpandCollapse = isCollapse => {
    if (this.state.name !== isCollapse) {
      this.setState({ name: isCollapse });
    }
  }

  render() {
    const {
      classes,
      radioBookmark,
      newTitle,
      existTitle,
      titleForLoad,
      listTitle,
      kitabName,
      tableBookmark
    } = this.props;
    const { name } = this.state;

    const titleBookmark = listTitle.map((title, idx) => (
      <MenuItem key={title + idx} value={title}>
        {title}
      </MenuItem>
    ));

    let disSaveButton = true;
    let disDelButton = true;

    if (name) {
      if (kitabName) {
        if (radioBookmark === 0) {
          if (titleForLoad !== newTitle) {
            if (!(/[^\w\s]/.test(newTitle))) {
              disSaveButton = false;
            }
          }
        } else {
          if (existTitle) {
            disDelButton = false; // false means not disabled
            if (titleForLoad !== existTitle) {
              disSaveButton = false;
            }
          }
        }
      }
    }

    const showBookmarkTable = Object.keys(tableBookmark);

    return (
      <div className={classes.root}>
        <div className={classes.sectionThree}>
          <InputJudulBookmark
            id='bookmarkTitleForLoad'
            watermark='Tampilkan bookmark'
            select={true} // render as Select component
            require={false}
            child={titleBookmark}
            text={titleForLoad}
            helper={'Total bookmark(s): ' + listTitle.length}
            collapsePanelHandler={this.handleForceExpandCollapse} />
        </div>
        {/* <Divider variant="middle" /> */}
        <div className={classes.sectionOne}>
          <div className={classes.root}>
            <ExpansionPanel
              square
              elevation={0}
              expanded={name === 'panel1'}
              onChange={this.handleChanged('panel1', 0)}
            >
              <ExpansionPanelSummary classes={{ root: classes.summaryHight, expanded: classes.expanded }}>
                <RadioButton
                  group='bookmark'
                  idx={0}
                  label='Buat judul baru' />
              </ExpansionPanelSummary>
              <ExpansionPanelDetails classes={{ root: classes.detailsPadd }}>
                <InputJudulBookmark
                  id='bookmarkNewTitle'
                  watermark='Ketik judul'
                  select={false}
                  require={radioBookmark === 0 ? true : false}
                  child={null}
                  text={newTitle}
                  helper=''
                  cannotSave={disSaveButton}
                  handleSave={this.handleSaveClicked}
                />
              </ExpansionPanelDetails>
            </ExpansionPanel>
            <ExpansionPanel
              classes={{ root: classes.getRidLine }}
              square
              elevation={0}
              expanded={name === 'panel2'}
              onChange={this.handleChanged('panel2', 1)}
            >
              <ExpansionPanelSummary classes={{ root: classes.summaryHight, expanded: classes.expanded }}>
                <RadioButton
                  group='bookmark'
                  idx={1}
                  label='Judul tersedia' />
              </ExpansionPanelSummary>
              <ExpansionPanelDetails classes={{ root: classes.detailsPadd }}>
                <InputJudulBookmark
                  id='bookmarkExistTitle'
                  watermark='Pilih judul'
                  select={true} // render as Select component
                  require={radioBookmark === 1 ? true : false}
                  child={titleBookmark}
                  text={existTitle}
                  helper='' />
              </ExpansionPanelDetails>
            </ExpansionPanel>
          </div>
        </div>
        <div className={classes.sectionTwo}>
          <DeleteButton disDelButton={disDelButton} handleDeleteClicked={this.handleDeleteClicked} />
          <SaveButton disSaveButton={disSaveButton} handleSaveClicked={this.handleSaveClicked} />
        </div>
        {showBookmarkTable.length ? <TableBookmarks /> : null}
        {/* <div className={classes.sectionthree}>
        </div> */}
      </div>
    );
  };
};

InputAndCombo.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => {
  return {
    radioBookmark: state.controlRadioCheck.radioBookmark,
    kitabName: state.mainBooksData.KitabName,
    newTitle: state.inputComboValue.newTitle,
    existTitle: state.inputComboValue.existTitle,
    titleForLoad: state.inputComboValue.titleForLoad,
    listTitle: state.inputComboValue.listTitle,
    openSnackBar: state.snackBarsSetting.openSnackBar,
    queueSnackBar: state.snackBarsSetting.queueSnackBar,
    messageSnackBar: state.snackBarsSetting.messageSnackBar,
    tableBookmark: state.tableOfBookmarks.tableBookmark
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onNewTitleChanged: (str) => dispatch({ type: actionTypes.NEWTITLE, value: str }),
    onExistTitleChanged: (str) => dispatch({ type: actionTypes.EXISTTITLE, value: str }),
    onTitleForLoadChanged: (str) => dispatch({ type: actionTypes.TITLEFORLOAD, value: str }),
    onStoreTitleList: (arRay) => dispatch({ type: actionTypes.STORELISTTITLE, arrayList: arRay }),
    onRadioBookmarkChecked: (booLean) => dispatch({ type: actionTypes.RADIOCHECKED, checked: booLean }),
    onShowHideSnackBars: (booLean, mess) => dispatch({
      type: actionTypes.OPENSNACKBARS,
      show: booLean,
      message: mess
    }),
    onPushSnackBarsQueue: (arRay) => dispatch({ type: actionTypes.PUSHTOQUEUE, queue: arRay }),
    onClearMainData: () => dispatch({ type: actionTypes.CLEARMAINDATA }),
    onClearKitabData: () => dispatch({ type: actionTypes.CLEARKITABDATA }),
    onClearBabData: () => dispatch({ type: actionTypes.CLEARBABDATA }),
    onClearOtherNumber: () => dispatch({ type: actionTypes.CLEAROTHERNUMBER }),
    onStoreBookmarkTable: (obj) => dispatch({ type: actionTypes.BOOKMARKTABLE, value: obj })
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(withTheme(withRouter(InputAndCombo))));
