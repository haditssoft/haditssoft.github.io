import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { withStyles, withTheme } from '@material-ui/core/styles';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import TextFieldsIcon from '@material-ui/icons/TextFields';
import BackupIcon from '@material-ui/icons/Backup';
import InfoIcon from '@material-ui/icons/Info';
import MoreIcon from '@material-ui/icons/MoreVert';
import Tooltip from '@material-ui/core/Tooltip';
import Zoom from '@material-ui/core/Zoom';
import Hidden from '@material-ui/core/Hidden';

import GoogleSearchInput from './items/GoogleSearchInput';
import { switchServer, authFetch } from '../sender/api';
import { connect } from 'react-redux';
import {
  TOTALROW,
  DISABLEFIRSTPREV,
  DISABLELASTNEXT,
  OPENSNACKBARS,
  PUSHTOQUEUE,
  SHOWNOTE,
  NOTEVALUE,
  OPENINFO,
  LOGIN_STATE
} from '../store/action';
import sender, { setDispatchTotalRow } from '../sender/senderDataRequest';
import getImamName from '../fungsi/getImamName';
import { IconBiografi, IconNote, IconAccountCircle, IconAccountCheck } from './items/IconsMDI';
import showSnackBar from '../fungsi/showSnackBar';
import FontSettings from './FontSettings/FontSettings';
import NavComponent from './NavComponent/NavComponent';
import LoginForm from './LoginForm/LoginForm';
import getNoteName from '../fungsi/getNoteName';
import withWidth from '@material-ui/core/withWidth';
import getKitabName from '../fungsi/getKitabName';


const styles = theme => ({
  root: {
    order: 1,
    // flex: '1 1 auto',
    '-webkit-app-region': 'drag',
  },
  grow: {
    flex: '1 1 43.4%',
    textAlign: 'center',
    '& > *': {
      '-webkit-app-region': 'no-drag'
    }
  },
  sectionDesktop: {
    display: 'flex',
    width: '28%',
    justifyContent: 'space-evenly',
    '& > *': {
      '-webkit-app-region': 'no-drag'
    }
  },
  sectionMobile: {
    display: 'flex',
    margin: '0 -5px 0 10px',
    '& > *': {
      '-webkit-app-region': 'no-drag'
    }
  },
  childNoDrag: {
    '& > :first-child': {
      '-webkit-app-region': 'no-drag'
    },
  },
  backColor: {
    backgroundColor: theme.palette.type === 'dark' ? '#111111' : null
  },
  setPaddingAndColor: {
    paddingRight: 24
  }
});


class PrimarySearchAppBar extends React.Component {
  state = {
    // anchorEl: null,
    mobileMoreAnchorEl: null,
    openFontDrawer: false,
    anchorAccount: null,
    openLogin: false
  };

  shouldComponentUpdate(nextProps) {
    if (this.props.theme.palette.type !== nextProps.theme.palette.type) {
      return true;
    }
    // adding this check: && nextProps.noteExist === this.props.noteExist
    // so remove badge on Note icon will work
    if (nextProps.openNote !== this.props.openNote && nextProps.noteExist === this.props.noteExist) {
      return false;
    }
    return true;
  };

  componentDidMount() {
    setDispatchTotalRow(this.propsForTotalRow);
  }

  propsForTotalRow = () => {
    return {
      TotalRow: this.props.TotalRow,
      onDispatchCountRow: this.props.onDispatchCountRow
    };
  }

  componentDidUpdate() {
    if (this.props.position === '') {
      this.props.onDisableFirstPrev(true);
      this.props.onDisableLastNext(true);
    } else if (this.props.position == 1) {
      if (this.props.firstPrev === false) {
        this.props.onDisableFirstPrev(true);
      };
      if (this.props.lastNext === true) {
        this.props.onDisableLastNext(false);
      };
    } else if (this.props.position == this.props.TotalRow) {
      if (this.props.firstPrev === true) {
        this.props.onDisableFirstPrev(false);
      };
      if (this.props.lastNext === false) {
        this.props.onDisableLastNext(true);
      };
    } else {
      if (this.props.firstPrev === true) {
        this.props.onDisableFirstPrev(false);
      };
      if (this.props.lastNext === true) {
        this.props.onDisableLastNext(false);
      }
    }
  }

  handleMenuClose = () => {
    // this.setState({ anchorEl: null });
    this.handleMobileMenuClose();
  }

  handleMobileMenuOpen = event => {
    this.setState({ mobileMoreAnchorEl: event.currentTarget });
  }

  handleMobileMenuClose = () => {
    this.setState({ mobileMoreAnchorEl: null });
  }

  handleAccountMenuOpen = (event) => {
    this.setState({ anchorAccount: event.currentTarget });
  }

  handleAccountMenuClose = () => {
    this.setState({ anchorAccount: null });
  }

  handleSignIn = () => {
    this.handleAccountMenuClose();
    this.setState({ openLogin: true });
  }

  handleCloseLogin = () => {
    this.setState({ openLogin: false });
  }

  handleSignOut = () => {
    this.handleAccountMenuClose();
    const token = localStorage.getItem('token');
    if (token) {
      authFetch(switchServer + 'auths/logout', { method: 'POST' })
        .then(() => {
          localStorage.removeItem('token');
          localStorage.removeItem('refresh_token');
          this.props.onLoginStateUpdate();
        })
        .catch(err => {
          console.log('logout error', err);
          localStorage.removeItem('token');
          localStorage.removeItem('refresh_token');
          this.props.onLoginStateUpdate();
        });
    } else {
      this.props.onLoginStateUpdate();
    }
  }

  // COPY ARAB AND INDO TEXT
  handleCopyHaditsText = async () => {
    if (this.state.mobileMoreAnchorEl !== null) {
      this.setState({ mobileMoreAnchorEl: null });
    }
    if (this.props.arabic !== '') {
      const targetText = this.props.arabic + '\r\n\r\n' + this.props.indo;
      // if (navigator.appVersion.indexOf('Win') !== -1) {
      //   navigator.clipboard.writeText(this.props.arabic + '\r\n\r\n' + this.props.indo);
      // } else if (navigator.appVersion.indexOf('Mac') !== -1 || navigator.appVersion.indexOf('Linux') !== -1) {
      //   navigator.clipboard.writeText(this.props.arabic + '\n\n' + this.props.indo);
      // } else {
      //   return;
      // }
      const formatted = targetText.replace(/\r?\n/g, '\n');
      if (navigator.clipboard && window.isSecureContext) {
        // Modern Async Clipboard API
        try {
          await navigator.clipboard.writeText(formatted);
          console.log('✅ Copied (modern API)');
          // sampe sini diasumsikan berhasil copy teks
          const message = {
            message: 'Teks berhasil dicopy',
            variant: 'success',
            key: new Date().getTime()
          };
          showSnackBar(this.props.queueSnackBar, message, this.props.openSnackBar,
            this.props.onPushSnackBarsQueue, this.props.onShowHideSnackBars, this.props.messageSnackBar);
        } catch (err) {
          console.warn('Modern clipboard failed, falling back...', err);
        }
      }
      // Fallback for HTTP or older browsers
      if (document.queryCommandSupported && document.queryCommandSupported('copy')) {
        const textarea = document.createElement('textarea');
        textarea.value = formatted;
        textarea.setAttribute('readonly', '');
        // Make it visible or hidden depending on need:
        textarea.style.position = 'fixed';
        textarea.style.top = '0';
        textarea.style.left = '0';
        textarea.style.width = '1px';
        textarea.style.height = '1px';
        textarea.style.opacity = '0';

        document.body.appendChild(textarea);

        textarea.focus();
        textarea.select();

        try {
          const success = document.execCommand('copy');
          console.log(`🔄 copy via execCommand: ${success}, ${formatted}`);
          if (success) {
            // sampe sini diasumsikan berhasil copy teks
            const message = {
              message: 'Teks berhasil dicopy',
              variant: 'success',
              key: new Date().getTime()
            };
            showSnackBar(this.props.queueSnackBar, message, this.props.openSnackBar,
              this.props.onPushSnackBarsQueue, this.props.onShowHideSnackBars, this.props.messageSnackBar);
          }
        } catch (err) {
          console.error('execCommand error:', err);
        } finally {
          document.body.removeChild(textarea);
        }
      } else {
        console.error('❌ copy command not supported');
      }
      console.error('✋ Clipboard not supported');
    } else {
      const message = {
        message: 'Tidak ada teks untuk dicopy',
        variant: 'error',
        key: new Date().getTime()
      };
      showSnackBar(this.props.queueSnackBar, message, this.props.openSnackBar,
        this.props.onPushSnackBarsQueue, this.props.onShowHideSnackBars, this.props.messageSnackBar);
    }
  };

  toggleFontDrawer = (open) => () => {
    if (this.state.mobileMoreAnchorEl !== null) {
      return this.setState({ mobileMoreAnchorEl: null, openFontDrawer: open });
    }
    this.setState({ openFontDrawer: open });
  }

  handleNoteAfterDiscardMenuLocal = () => {
    if (this.props.KitabName) {
      if (this.props.openNote === false) {
        const token = localStorage.getItem('token');
        if (token) {
          const noteStore = getKitabName(this.props.KitabName);
          authFetch(switchServer + 'notes/' + noteStore + '/' + this.props.Nomer)
            .then(res => {
              if (res.status !== 200) {
                this.props.onStoreNoteValue('');
                throw new Error('Failed to fetch note data.');
              }
              return res.json();
            })
            .then(noteContent => {
              if (noteContent) {
                if (typeof noteContent === 'string') {
                  this.props.onStoreNoteValue(noteContent);
                } else if (noteContent.note) {
                  this.props.onStoreNoteValue(noteContent.note);
                } else {
                  this.props.onStoreNoteValue(noteContent[0]);
                }
              } else {
                this.props.onStoreNoteValue('');
              }
            })
            .catch(err => console.log('fetch note local', err));
        } else {
          alert('Sign in diperlukan untuk melihat dan membuat catatan');
          return;
        }
      }
      this.props.onShowNote(!this.props.openNote);
    }
  }

  handleNoteLocal = () => {
    if (this.state.mobileMoreAnchorEl !== null) {
      return this.setState({ mobileMoreAnchorEl: null }, () => this.handleNoteAfterDiscardMenuLocal());
    }
    this.handleNoteAfterDiscardMenuLocal();
  }

  handleBiography = () => {
    if (this.state.mobileMoreAnchorEl !== null) {
      this.setState({ mobileMoreAnchorEl: null });
    }
    const bioTable = getImamName(this.props.KitabName);
    sender('loadBiographyData', [bioTable]);
  };

  handleInfo = () => {
    if (this.state.mobileMoreAnchorEl !== null) {
      this.setState({ mobileMoreAnchorEl: null });
    }
    this.props.onOpenCloseInfo(true);
  }

  render() {
    const { mobileMoreAnchorEl } = this.state;
    const { classes, noteExist } = this.props;
    // const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
    const iconMenuColor = this.props.theme.palette.type === 'light' ? 'primary' : 'default';

    const renderMobileMenu = (
      <Menu
        anchorEl={mobileMoreAnchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isMobileMenuOpen}
        onClose={this.handleMenuClose}
      >
        <MenuItem disableGutters className={classes.setPaddingAndColor} onClick={this.toggleFontDrawer(true)}>
          <IconButton color={iconMenuColor}>
            <TextFieldsIcon />
          </IconButton>
          <p>Font</p>
        </MenuItem>
        <MenuItem disableGutters className={classes.setPaddingAndColor} onClick={this.handleCopyHaditsText}>
          <IconButton color={iconMenuColor}>
            <FileCopyIcon />
          </IconButton>
          <p>Copy</p>
        </MenuItem>
        <MenuItem disableGutters className={classes.setPaddingAndColor} onClick={this.handleNoteLocal}>
          <IconButton color={iconMenuColor}>
            {noteExist ?
              <Badge badgeContent={1} color="secondary">
                <IconNote />
              </Badge> :
              <IconNote />}
          </IconButton>
          <p>Note</p>
        </MenuItem>
        <MenuItem disableGutters className={classes.setPaddingAndColor} onClick={this.handleBiography}>
          <IconButton color={iconMenuColor}>
            <IconBiografi />
          </IconButton>
          <p>Bio</p>
        </MenuItem>
        <MenuItem disableGutters className={classes.setPaddingAndColor} onClick={this.handleAccountMenuOpen}>
          <IconButton color={iconMenuColor}>
            {localStorage.getItem('token') ? <IconAccountCheck /> : <IconAccountCircle />}
          </IconButton>
          <p>Account</p>
        </MenuItem>
        <MenuItem disableGutters className={classes.setPaddingAndColor} onClick={this.handleInfo}>
          <IconButton color={iconMenuColor}>
            <InfoIcon />
          </IconButton>
          <p>Info</p>
        </MenuItem>
      </Menu>
    );

    const isAccountMenuOpen = Boolean(this.state.anchorAccount);
    const renderAccountMenu = (
      <Menu
        anchorEl={this.state.anchorAccount}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isAccountMenuOpen}
        onClose={this.handleAccountMenuClose}
      >
        {localStorage.getItem('token') ?
          <MenuItem onClick={this.handleSignOut}>Sign Out</MenuItem> :
          <MenuItem onClick={this.handleSignIn}>Sign In</MenuItem>
        }
      </Menu>
    );

    return (
      <div className={classes.root}>
        <AppBar position="static" className={classes.backColor}>
          <Toolbar variant={this.props.width === "xs" ? "dense" : "regular"} classes={{ root: classes.childNoDrag }} >
            {/* HUMBURGER DAN SEARCH */}
            <GoogleSearchInput />
            {/* KOMPONEN NAVIGASI */}
            <Hidden smDown>
              <div className={classes.grow}><NavComponent inputStyles={'appbar'} /></div>
            </Hidden>
            {/* KOMPONEN ICON MENU */}
            <FontSettings open={this.state.openFontDrawer} clicked={this.toggleFontDrawer} />
            <Hidden smDown>
              <div className={classes.sectionDesktop}>
                <Tooltip TransitionComponent={Zoom} title="Font settings">
                  <IconButton onClick={this.toggleFontDrawer(true)}>
                    <TextFieldsIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip TransitionComponent={Zoom} title="Copy arabic & translation">
                  <IconButton onClick={this.handleCopyHaditsText}>
                    <FileCopyIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip TransitionComponent={Zoom} title="Catatan">
                  <IconButton onClick={this.handleNoteLocal}>
                    {noteExist ?
                      <Badge badgeContent={1} color="secondary">
                        <IconNote />
                      </Badge> :
                      <IconNote />}
                  </IconButton>
                </Tooltip>
                <Tooltip TransitionComponent={Zoom} title="Biografi">
                  <IconButton onClick={this.handleBiography}>
                    <IconBiografi />
                  </IconButton>
                </Tooltip>
                <Tooltip TransitionComponent={Zoom} title="Info">
                  <IconButton
                    onClick={this.handleInfo}
                  >
                    <InfoIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip TransitionComponent={Zoom} title="User Account">
                  <IconButton onClick={this.handleAccountMenuOpen}>
                    {localStorage.getItem('token') ? <IconAccountCheck /> : <IconAccountCircle />}
                  </IconButton>
                </Tooltip>
              </div>
            </Hidden>
            <Hidden mdUp>
              <div className={classes.sectionMobile}>
                <IconButton aria-haspopup="true" onClick={this.handleMobileMenuOpen}>
                  {noteExist ?
                    <Badge badgeContent={1} color="secondary">
                      <MoreIcon />
                    </Badge> :
                    <MoreIcon />}
                </IconButton>
              </div>
            </Hidden>
          </Toolbar>
        </AppBar>
        {renderMobileMenu}
        {renderAccountMenu}
        {this.state.openLogin && <LoginForm openExternal={true} handleCloseExternal={this.handleCloseLogin} />}
      </div>
    );
  }
}

PrimarySearchAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => {
  return {
    arabic: state.mainBooksData.Arabic,
    indo: state.mainBooksData.Indonesia,
    KitabName: state.mainBooksData.KitabName,
    Nomer: state.mainBooksData.Nomer,
    TotalRow: state.mainBooksData.TotalRow,
    position: state.mainBooksData.Position,
    firstPrev: state.disableNavButton.firstPrev,
    lastNext: state.disableNavButton.lastNext,
    openSnackBar: state.snackBarsSetting.openSnackBar,
    queueSnackBar: state.snackBarsSetting.queueSnackBar,
    messageSnackBar: state.snackBarsSetting.messageSnackBar,
    openNote: state.showNote.openNote,
    noteExist: state.showNote.noteExist
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onDispatchCountRow: (rows) => dispatch({ type: TOTALROW, totalRow: rows }),
    onDisableFirstPrev: (booLean) => dispatch({ type: DISABLEFIRSTPREV, disable: booLean }),
    onDisableLastNext: (booLean) => dispatch({ type: DISABLELASTNEXT, disable: booLean }),
    onShowHideSnackBars: (booLean, mess) => dispatch({
      type: OPENSNACKBARS,
      show: booLean,
      message: mess
    }),
    onPushSnackBarsQueue: (arRay) => dispatch({ type: PUSHTOQUEUE, queue: arRay }),
    onShowNote: (booLean) => dispatch({ type: SHOWNOTE, open: booLean }),
    onStoreNoteValue: (str) => dispatch({ type: NOTEVALUE, value: str }),
    onOpenCloseInfo: (booLean) => dispatch({ type: OPENINFO, open: booLean }),
    onLoginStateUpdate: () => dispatch({ type: LOGIN_STATE })
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(withTheme(withWidth()(PrimarySearchAppBar))));
