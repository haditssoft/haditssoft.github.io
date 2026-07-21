import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, withTheme } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { MuiThemeProvider } from '@material-ui/core/styles';

import underlineThemeColor from '../../../fungsi/underlineThemeColor';
import { connect } from 'react-redux';
import { SETARABICFONT, SETINDOFONT } from '../../../store/action';
import { menuProps, selectedColorMenuItem } from './ComboFont';


const styles = theme => ({
  formControl: {
    margin: theme.spacing(1),
  },
  arrowIcon: {
    color: theme.palette.primary.main,
  },
  selectJox: {
    color: theme.palette.primary.main,
    "&:focus": {
      backgroundColor: theme.palette.background.default,
    }
  },
});

const selectedColorMenuItemMod = theme => {
  const replaceFontWeight = selectedColorMenuItem(theme);
  return {
    MuiMenuItem: {
      root: {
        '&$selected': {
          ...replaceFontWeight.MuiMenuItem.root['&$selected'],
          fontWeight: 500,
        }
      }
    }
  }
};

const standardStyle = [{ style: 'Light', value: 300 }, { style: 'Regular', value: 400 }, { style: 'Medium', value: 500 }];
const justRegular = [{ style: 'Regular', value: 400 }];
const semiStandard = [{ style: 'Light', value: 300 }, { style: 'Regular', value: 400 }, { style: 'Semi-Bold', value: 600 }];
const regularBold = [{ style: 'Regular', value: 400 }, { style: 'Bold', value: 700 }];
// const withoutLight = [{style: 'Regular', value: 400}, {style: 'Medium', value: 500}];

const arabicFontCollection = {
  'Noto Naskh Arabic': regularBold,
  'Uthman Naskh': regularBold,
  'Uthman Hafs': justRegular,
  Lateef: justRegular,
  Scheherazade: regularBold,
  // Tajawal: standardStyle,
  // Mada: standardStyle,
  // Katibeh: justRegular,
  // Mirza: withoutLight,
  // Harmattan: justRegular,
  // Lalezar: justRegular,
};

const indoFontCollection = {
  Roboto: standardStyle,
  Montserrat: standardStyle,
  'Open Sans': semiStandard,
  // Tajawal: standardStyle,
  // 'Macondo Swash Caps': justRegular,
  // 'Titillium Web': semiStandard,
  // Yantramanav: standardStyle,
  // Comfortaa: standardStyle,
  // Muli: semiStandard,
  // Raleway: standardStyle,
  Ubuntu: standardStyle,
  // Saira: standardStyle,
  // 'Josefin Sans': semiStandard,
  Kodchasan: standardStyle,
  // Pacifico: justRegular,
  // Ranga: justRegular,
  Sanchez: justRegular
};

class ComboStyle extends React.Component {
  state = {
    open: false,
  };

  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.theme.palette.type !== nextProps.theme.palette.type) {
      return true;
    }
    if (this.props.lang === 'arabic' && this.props.arabicFont[2] !== nextProps.arabicFont[2] || this.state.open !== nextState.open) {
      return true;
    } else if (this.props.lang === 'indo' && this.props.indoFont[2] !== nextProps.indoFont[2] || this.state.open !== nextState.open) {
      return true;
    };
    return false;
  };

  handleChange = (event) => {
    let firstPortion;
    let secondPortion;
    let finalFont;
    if (this.props.lang === 'arabic') {
      firstPortion = this.props.arabicFont.slice(0, 2);
      secondPortion = this.props.arabicFont.slice(3);
      finalFont = [...firstPortion, event.target.value, ...secondPortion];
      this.props.onSetArabicFont(finalFont);
      // store.set('arabic', finalFont);
    } else {
      firstPortion = this.props.indoFont.slice(0, 2);
      secondPortion = this.props.indoFont.slice(3);
      finalFont = [...firstPortion, event.target.value, ...secondPortion];
      this.props.onSetIndoFont(finalFont);
      // store.set('indo', finalFont);
    }
  }

  handleClose = () => {
    this.setState({ open: false });
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  render() {
    const { classes, lang, arabicFont, indoFont } = this.props;
    
    const fontList = (lang === 'arabic' ?
      arabicFontCollection[arabicFont[0]]
        .map((obj) => <MenuItem key={obj.style} value={obj.value}>{obj.style}</MenuItem>) :
      indoFontCollection[indoFont[0]]
        .map((obj) => <MenuItem key={obj.style} value={obj.value}>{obj.style}</MenuItem>)
    );

    let switchTheme = '#3F51B5';
    if (this.props.theme.palette.type === 'dark') {
      switchTheme = '#007ACC';
    }

    return (
      <form autoComplete="off" key={lang}>
        <FormControl className={classes.formControl}>
          <MuiThemeProvider theme={underlineThemeColor(switchTheme, selectedColorMenuItemMod(this.props.theme))}>
            <Select
              open={this.state.open}
              onOpen={this.handleOpen}
              onClose={this.handleClose}
              value={lang === 'arabic' ? arabicFont[2] : indoFont[2]}
              onChange={this.handleChange}
              inputProps={{
                name: lang,
                id: 'controlled-open-' + lang,
                classes: { select: classes.selectJox },
              }}
              MenuProps={menuProps(this.props.theme)}
              classes={{ icon: classes.arrowIcon }}
            >
              {fontList}
              {/* <MenuItem value={40}>Roboto</MenuItem>
                    <MenuItem value={50}>Montserrat</MenuItem> */}
            </Select>
          </MuiThemeProvider>
        </FormControl>
      </form>
    );
  }
}

ComboStyle.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(withTheme(ComboStyle)));
