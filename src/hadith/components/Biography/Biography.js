import React from 'react';
import { withStyles, withTheme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Paper from '@material-ui/core/Paper';
import withMobileDialog from '@material-ui/core/withMobileDialog';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Draggable from 'react-draggable';

import { connect } from 'react-redux';
import { OPENBIOGRAPHY, TEXTBIOGRAPHY } from '../../store/action';
import replaceNewLine from '../../fungsi/replaceNewLine';
import sender, { setDispatchBiography } from '../../sender/senderDataRequest';

const styles = theme => ({
  root: {
    userSelect: 'none',
  },
  selectImam: {
    position: 'absolute',
    right: theme.spacing(3),
    top: theme.spacing(2),
  },
  addImamName: {
    [theme.breakpoints.down('xs')]: {
      display: 'none'
    }
  }
});

function PaperComponent(props) {
  return (
    <Draggable
      handle="#draggable-dialog-title"
      enableUserSelectHack={false}
    >
      <Paper {...props} />
    </Draggable>
  );
};

class DraggableDialog extends React.Component {

  shouldComponentUpdate(nextProps) {
    if (this.props.theme.palette.type !== nextProps.theme.palette.type) {
      return true;
    }
    if (nextProps.openBiography === this.props.openBiography && this.props.openBiography === false) {
      return false;
    }
    return true;
  }

  componentDidMount() {
    setDispatchBiography(this.propsForBiography);
  }

  propsForBiography = () => {
    return {
      onStoreTextBiography: this.props.onStoreTextBiography,
      onOpenCloseBiography: this.props.onOpenCloseBiography
    };
  }

  componentDidUpdate() {
    setTimeout(() => {
      if (this.props.openBiography === false && this.props.textBiography !== '') {
        this.props.onStoreTextBiography('', '');
      }
    }, 2000);
  }

  handleClose = () => {
    this.props.onOpenCloseBiography(false);
  }

  handleChange = (event) => {
    sender('loadBiographyData', [event.target.value]);
  }

  render() {
    const { classes, openBiography, textBiography, imamName, fullScreen } = this.props;
    let newLineReplaced = '';
    if (textBiography) newLineReplaced = replaceNewLine(textBiography);

    return (
      <Dialog
        open={openBiography}
        onClose={this.handleClose}
        PaperComponent={PaperComponent}
        scroll='paper'
        fullWidth={true}
        maxWidth='sm'
        fullScreen={fullScreen}
        aria-labelledby='draggable-dialog-title'
      >
        <DialogTitle classes={{ root: classes.root }} id='draggable-dialog-title' onMouseDown={e => e.preventDefault()}>
          {'Biografi'}<span className={classes.addImamName}>{' Imam ' + imamName}</span>
          <Select
            className={classes.selectImam}
            value={imamName}
            onChange={this.handleChange}
            inputProps={{
              name: 'imam',
              id: 'select-imam',
            }}
            MenuProps={{
              anchorOrigin: {
                vertical: "bottom",
                horizontal: "left"
              },
              transformOrigin: {
                vertical: "top",
                horizontal: "left"
              },
              getContentAnchorEl: null,
              // style: {
              //   maxWidth: 10,
              // },
            }}
          >
            <MenuItem value="Bukhari">Imam Bukhari</MenuItem>
            <MenuItem value="Muslim">Imam Muslim</MenuItem>
            <MenuItem value="Tirmidzi">Imam Tirmidzi</MenuItem>
            <MenuItem value="Abu Daud">Imam Abu Daud</MenuItem>
            <MenuItem value="Nasa'i">Imam Nasa'i</MenuItem>
            <MenuItem value="Ibnu Majah">Imam Ibnu Majah</MenuItem>
            <MenuItem value="Darimi">Imam Darimi</MenuItem>
            <MenuItem value="Ahmad">Imam Ahmad</MenuItem>
            <MenuItem value="Malik">Imam Malik</MenuItem>
            <MenuItem value="Daruquthni">Imam Daruquthni</MenuItem>
          </Select>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {newLineReplaced}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleClose} color='primary'>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    );
  };
};

const mapStateToProps = state => {
  return {
    openBiography: state.biography.openBiography,
    textBiography: state.biography.textBiography,
    imamName: state.biography.imamName
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onOpenCloseBiography: (booLean) => dispatch({ type: OPENBIOGRAPHY, open: booLean }),
    onStoreTextBiography: (name, str) => dispatch({ type: TEXTBIOGRAPHY, imam: name, text: str })
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withMobileDialog()(withStyles(styles)(withTheme(DraggableDialog))));
