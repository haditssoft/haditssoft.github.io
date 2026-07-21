import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, withTheme } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { MuiThemeProvider } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import underlineThemeColor from '../../../fungsi/underlineThemeColor';
import { connect } from 'react-redux';
import { SETARABICFONT, SETINDOFONT } from '../../../store/action';


const styles = theme => ({
  formControl: {
    margin: theme.spacing(1),
  },
  arrowIcon: {
    color: theme.palette.primary.main,
  },
  selectJos: {
    color: theme.palette.primary.main,
    "&:focus": {
      backgroundColor: theme.palette.background.default,
    }
  },
});

export const menuProps = (theme) => ({
  PaperProps: {
    style: {
      maxHeight: 200,
      width: 250,
      color: (theme.palette.type === 'light') ? theme.palette.text.primary : 'rgba(255, 255, 255, 0.7)',
      backgroundColor: (theme.palette.type === 'light') ? theme.palette.background.paper : '#222222'
    }
  }
});

export const selectedColorMenuItem = theme => ({
  MuiMenuItem: {
    root: {
      '&$selected': {
        backgroundColor: '#8c9eff !important',
        color: (theme.palette.type === 'light') ? '#303F9F !important' : '#007ACC !important',
        fontWeight: 900,
      }
    }
  }
});

class ComboFont extends React.Component {
  state = {
    open: false,
  };

  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.theme.palette.type !== nextProps.theme.palette.type) {
      return true;
    }
    // eslint-disable-next-line
    if (this.props.lang === 'arabic' && this.props.arabicFont[0] !== nextProps.arabicFont[0] || this.state.open !== nextState.open) {
      return true;
      // eslint-disable-next-line
    } else if (this.props.lang === 'indo' && this.props.indoFont[0] !== nextProps.indoFont[0] || this.state.open !== nextState.open) {
      return true;
    }
    return false;
  };

  componentDidMount() {
    this.props.getFontSetting(this.props.arabicFont, this.props.indoFont);
  }

  componentWillUnmount() {
    this.props.getFontSetting(this.props.arabicFont, this.props.indoFont);
  }

  handleChange = (event) => {
    let secondPortion, kind, finalFont;
    if (this.props.lang === 'arabic') {
      // current font: ['Scheherazade', 'serif', 400, 31]
      secondPortion = this.props.arabicFont.slice(2); // remove the first: [400, 31]
      finalFont = event.target.value;
      switch (finalFont) {
        case 'Noto Naskh Arabic':
          kind = 'serif';
          break;
        case 'Uthman Naskh':
          kind = 'serif';
          break;
        case 'Uthman Hafs':
          kind = 'serif';
          break;
        case 'Lateef':
          kind = 'cursive';
          break;
        case 'Scheherazade':
          kind = 'serif';
          break;
        default:
          break;
      }
      // insert new value at first index: [event.target.value, 'serif', 400, 31]
      finalFont = [finalFont, kind, ...secondPortion];
      this.props.onSetArabicFont(finalFont);
    } else {
      secondPortion = this.props.indoFont.slice(2);
      switch (event.target.value) {
        case 'Roboto':
        case 'Montserrat':
        case 'Open Sans':
        case 'Ubuntu':
        case 'Kodchasan':
          kind = 'sans-serif';
          break;
        case 'Sanchez':
          kind = 'serif';
          break;
        default:
          break;
      }
      finalFont = [event.target.value, kind, ...secondPortion];
      this.props.onSetIndoFont(finalFont);
    }
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  render() {
    const { classes, lang, arabicFont, indoFont } = this.props;

    const fontList = (lang === 'arabic' ?
      ['Noto Naskh Arabic', 'Uthman Naskh', 'Uthman Hafs', 'Lateef', 'Scheherazade']
        .map(name => (
          <MenuItem key={name} value={name}>
            {/* color: 'currentColor', fontWeight: 'inherit' retrieve data from selectedColorMenuItem */}
            <Typography style={{ fontFamily: name, color: 'currentColor', fontWeight: 'inherit', fontSize: '1.3rem', lineHeight: 1 }}>
              {name.replace(' Arabic', '') + ' (حديث نبوي)'}
            </Typography>
          </MenuItem>
        )) :
      ['Roboto', 'Montserrat', 'Open Sans', 'Ubuntu', 'Kodchasan', 'Sanchez']
        .map((name) => (<MenuItem key={name} value={name}>
          {/* color: 'currentColor', fontWeight: 'inherit' retrieve data from selectedColorMenuItem */}
          <Typography style={{ fontFamily: name, color: 'currentColor', fontWeight: 'inherit', fontSize: 'inherit' }}>
            {name}
          </Typography>
        </MenuItem>))
    );

    let switchTheme= '#3F51B5';
    if (this.props.theme.palette.type === 'dark') {
      switchTheme = '#007ACC';
    }

    return (
      <form autoComplete="off" key={lang}>
        <FormControl className={classes.formControl}>
          <MuiThemeProvider theme={underlineThemeColor(switchTheme, selectedColorMenuItem(this.props.theme))}>
            <Select
              open={this.state.open}
              onOpen={this.handleOpen}
              onClose={this.handleClose}
              value={lang === 'arabic' ? arabicFont[0] : indoFont[0]}
              onChange={this.handleChange}
              inputProps={{
                name: lang,
                id: 'controlled-open-' + lang,
                classes: { select: classes.selectJos },
              }}
              MenuProps={menuProps(this.props.theme)}
              classes={{ icon: classes.arrowIcon }}
            >
              {fontList}
            </Select>
          </MuiThemeProvider>
        </FormControl>
      </form>
    );
  }
}

ComboFont.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => {
  return {
    arabicFont: state.fontSetting.arabicFont,
    indoFont: state.fontSetting.indoFont,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onSetArabicFont: (arab) => dispatch({ type: SETARABICFONT, aFont: arab }),
    onSetIndoFont: (indo) => dispatch({ type: SETINDOFONT, iFont: indo })
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(withTheme(ComboFont)));
