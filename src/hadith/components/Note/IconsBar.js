import React from 'react';
import classNames from 'classnames';
import { withStyles, withTheme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import SaveIcon from '@material-ui/icons/Save';
import DeleteIcon from '@material-ui/icons/Delete';
import CloseIcon from '@material-ui/icons/Close';
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';
import CreateIcon from '@material-ui/icons/Create';

import { connect } from 'react-redux';
import { SHOWNOTE, PUSHTOQUEUE, OPENSNACKBARS, NOTEEXIST, SWITCHNOTEMODE, ALLNOTESDATA } from '../../store/action';
import showSnackBar from '../../fungsi/showSnackBar';
import { prepareDeletion } from '../../fungsi/deleteForSnackBar';
import getNoteName from '../../fungsi/getNoteName';
import getKitabName from '../../fungsi/getKitabName';
import { switchServer, authFetch } from '../../sender/api';


const styles = theme => ({
  root: {
    backgroundColor: theme.palette.type === 'dark' ? null : theme.palette.primary.main
  },
  button: {
    color: theme.palette.type === 'dark' ? theme.palette.primary.main : theme.palette.background.paper
  },
  showBottomBorder: {
    paddingBottom: 10,
    borderBottomWidth: 2,
    borderBottomColor: theme.palette.type === 'dark' ? theme.palette.primary.main : theme.palette.background.paper,
    borderBottomStyle: 'solid',
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
  },
});

const confName = [
  'ShahihBukhari',
  'ShahihMuslim',
  'SunanTirmidzi',
  'SunanAbuDaud',
  'SunanNasai',
  'SunanIbnuMajah',
  'dariminote',
  'ahmadnote',
  'maliknote',
  'daruquthninote',
  'ibnukhuzaimahnote',
  'ibnuhibbannote',
  'mustadraknote',
  'syafiinote'
];

let indexConfName = 0;
let arrayOfObject = []; // ['bukharinote', '56:bla la bu da hu ca', 'muslimnote', '32:lala baba']
let countNoteEachBook = {}; // {bukharinote: 1, muslimnote: 4}

class IconsBar extends React.Component {
  state = {
    disabledButton: false,
  };

  shouldComponentUpdate(nextProps) {
    if (this.props.theme.palette.type !== nextProps.theme.palette.type) {
      return true;
    }
    if (this.props.noteMode !== nextProps.noteMode) {
      return true;
    };
    return false;
  };

  handleCloseNote = () => {
    this.props.onShowNote(false);
  };


  fetchAllNotes = () => new Promise((resolve, reject) => {
    const name = confName[indexConfName];
    const token = localStorage.getItem('token');
    if (token) {
      authFetch(switchServer + 'notes/' + name)
        .then(res => {
          if (res.status === 404) {
            return resolve({});
          }
          if (res.status !== 200) {
            throw new Error('Failed fetching all notes');
          }
          return res.json();
        })
        .then(resData => {
          if (resData && resData.notes) {
            resolve(resData.notes);
          } else {
            resolve({});
          }
        })
        .catch(err => {
          console.log('get all notes', err);
          resolve({});
        });
    } else {
      resolve({});
    }
  })

  processingFetchedData = (resData) => {
    if (resData) {
      const name = confName[indexConfName];
      const arrayOfData = Object.keys(resData); // ['56', ...]
      arrayOfObject.push(name);
      countNoteEachBook[name] = arrayOfData.length;
      for (let idx = 0, n = arrayOfData.length; idx < n; idx++) {
        const num = arrayOfData[idx];
        arrayOfObject.push(num + ':' + resData[num]);
      }
      this.props.onStoreAllNotesData([arrayOfObject, countNoteEachBook]);
    }
  }

  handleSwitchMode = mode => () => {
    this.setState({ disabledButton: true });
    this.props.onSwitchNoteMode(mode);
    if (mode === 'list') {
      indexConfName = 0;
      this.fetchAllNotes()
        .then(resData => { // {56: '...', ...}
          this.processingFetchedData(resData);
          indexConfName = 1;
          return this.fetchAllNotes();
        })
        .then(resData => { // {56: '...', ...}
          this.processingFetchedData(resData);
          indexConfName = 2;
          return this.fetchAllNotes();
        })
        .then(resData => { // {56: '...', ...}
          this.processingFetchedData(resData);
          indexConfName = 3;
          return this.fetchAllNotes();
        })
        .then(resData => { // {56: '...', ...}
          this.processingFetchedData(resData);
          indexConfName = 4;
          return this.fetchAllNotes();
        })
        .then(resData => { // {56: '...', ...}
          this.processingFetchedData(resData);
          indexConfName = 5;
          return this.fetchAllNotes();
        })
        .then(resData => { // {56: '...', ...}
          this.processingFetchedData(resData);
          indexConfName = 6;
          return this.fetchAllNotes();
        })
        .then(resData => { // {56: '...', ...}
          this.processingFetchedData(resData);
          indexConfName = 7;
          return this.fetchAllNotes();
        })
        .then(resData => { // {56: '...', ...}
          this.processingFetchedData(resData);
          indexConfName = 8;
          return this.fetchAllNotes();
        })
        .then(resData => { // {56: '...', ...}
          this.processingFetchedData(resData);
          indexConfName = 9;
          return this.fetchAllNotes();
        })
        .then(resData => { // {56: '...', ...}
          this.processingFetchedData(resData);
          indexConfName = 10;
          return this.fetchAllNotes();
        })
        .then(resData => { // {56: '...', ...}
          this.processingFetchedData(resData);
          indexConfName = 11;
          return this.fetchAllNotes();
        })
        .then(resData => { // {56: '...', ...}
          this.processingFetchedData(resData);
          indexConfName = 12;
          return this.fetchAllNotes();
        })
        .then(resData => { // {56: '...', ...}
          this.processingFetchedData(resData);
          indexConfName = 13;
          return this.fetchAllNotes();
        })
        .then(resData => { // {56: '...', ...}
          this.processingFetchedData(resData);
          arrayOfObject = [];
          countNoteEachBook = {};
        })
    } else {
      this.setState({ disabledButton: false });
      this.props.onStoreAllNotesData([[], {}]);
      this.props.onSwitchNoteMode(mode);
    }
  };

  handleSaveNote = () => {
    if (/\w/.test(this.props.noteValue)) {
        const token = localStorage.getItem('token');
        if (token) {
          const noteStore = getKitabName(this.props.kitabName);
          let num = this.props.nomer;
          const notif = { message: 'Catatan berhasil disimpan' };
          authFetch(switchServer + 'notes/' + noteStore + '/' + num, {
            method: 'POST',
            body: JSON.stringify({ note: this.props.noteValue })
          })
          .then(res => {
            if (res.status !== 200 && res.status !== 204) {
              const parsed = res.json();
              console.log(parsed);
              const message = {
                message: parsed.body.message ?? 'Gagal menyimpan catatan',
                variant: 'error',
                key: new Date().getTime()
              };
              showSnackBar(this.props.queueSnackBar, message, this.props.openSnackBar,
                this.props.onPushSnackBarsQueue, this.props.onShowHideSnackBars, this.props.messageSnackBar);
              throw new Error('Failed to save note.');
            }
            return true
          })
          .then(() => {
            const message = {
              ...notif,
              variant: 'success',
              key: new Date().getTime()
            };
            showSnackBar(this.props.queueSnackBar, message, this.props.openSnackBar,
              this.props.onPushSnackBarsQueue, this.props.onShowHideSnackBars, this.props.messageSnackBar);
            this.props.onNoteExist(true);
          })
          .catch(() => {
            const message = {
              message: 'Gagal menyimpan catatan',
              variant: 'error',
              key: new Date().getTime()
            };
            showSnackBar(this.props.queueSnackBar, message, this.props.openSnackBar,
              this.props.onPushSnackBarsQueue, this.props.onShowHideSnackBars, this.props.messageSnackBar);
          });
      } else {
        alert('You are not signed in');
      }
    }
  };

  handleDeleteNote = () => {
    const token = localStorage.getItem('token');
    if (token) {
      const noteStore = getKitabName(this.props.kitabName);
      const num = this.props.nomer;
      authFetch(switchServer + 'notes/validate-delete/' + noteStore + '/' + num)
        .then(res => {
          if (res.status === 404 || res.status === 400) {
            return null;
          }
          if (!res.ok) {
            throw new Error('Failed to check existing note');
          }
          return res.json();
        })
        .then(resData => {
          if (resData && resData.note) {
            const message = {
              message: 'Catatan akan dihapus...',
              variant: 'warning',
              key: new Date().getTime()
            };
            showSnackBar(this.props.queueSnackBar, message, this.props.openSnackBar,
              this.props.onPushSnackBarsQueue, this.props.onShowHideSnackBars, this.props.messageSnackBar);
            prepareDeletion({
              theStore: noteStore,
              theTargetKey: num,
              id: message.key,
              check: this.props.kitabName,
            }, () => {
              this.props.onShowNote(false);
              this.props.onNoteExist(false);
            },
              this.fetchKitabNameForDeleteForSnackBarJS);
          } else {
            alert('This hadith has no note to be deleted');
          }
        })
        .catch(err => console.log('check note', err))
    } else {
      alert('You are not signed in');
    }
  }

  fetchKitabNameForDeleteForSnackBarJS = () => {
    return this.props.kitabName;
  };

  render() {
    const { classes, noteMode } = this.props;

    return (
      <Paper square elevation={4} classes={{ root: classes.root }}>
        <IconButton
          className={classNames(classes.button, noteMode === 'create' ? classes.showBottomBorder : null)}
          aria-label="create-note"
          onClick={this.handleSwitchMode('create')}>
          <CreateIcon fontSize='small' />
        </IconButton>
        <IconButton
          className={classNames(classes.button, noteMode === 'list' ? classes.showBottomBorder : null)}
          aria-label="list-of-note"
          onClick={this.handleSwitchMode('list')}>
          <FormatListBulletedIcon fontSize='small' />
        </IconButton>
        <IconButton
          disabled={this.state.disabledButton}
          className={classes.button}
          aria-label="save-note"
          onClick={this.handleSaveNote}>
          <SaveIcon fontSize='small' />
        </IconButton>
        <IconButton
          disabled={this.state.disabledButton}
          className={classes.button}
          aria-label="delete-note"
          onClick={this.handleDeleteNote}>
          <DeleteIcon fontSize='small' />
        </IconButton>
        <IconButton
          style={{ float: 'right' }}
          className={classes.button}
          aria-label="Close note"
          onClick={this.handleCloseNote}>
          <CloseIcon fontSize='small' />
        </IconButton>
      </Paper>
    );
  };
};

const mapStateToProps = state => {
  return {
    noteValue: state.showNote.noteValue,
    noteMode: state.switchNoteMode.noteMode,
    kitabName: state.mainBooksData.KitabName,
    nomer: state.mainBooksData.Nomer,
    openSnackBar: state.snackBarsSetting.openSnackBar,
    queueSnackBar: state.snackBarsSetting.queueSnackBar,
    messageSnackBar: state.snackBarsSetting.messageSnackBar,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onNoteExist: (booLean) => dispatch({ type: NOTEEXIST, exist: booLean }),
    onShowNote: (booLean) => dispatch({ type: SHOWNOTE, open: booLean }),
    onPushSnackBarsQueue: (arRay) => dispatch({ type: PUSHTOQUEUE, queue: arRay }),
    onShowHideSnackBars: (booLean, mess) => dispatch({
      type: OPENSNACKBARS,
      show: booLean,
      message: mess
    }),
    onSwitchNoteMode: (str) => dispatch({ type: SWITCHNOTEMODE, mode: str }),
    onStoreAllNotesData: (arRay) => dispatch({ type: ALLNOTESDATA, note: arRay }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(withTheme(IconsBar)));