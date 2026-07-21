import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, withTheme } from '@material-ui/core/styles';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';

import * as actionTypes from '../../store/action';
import { connect } from 'react-redux';
import sender from '../../sender/senderDataRequest';
import calcPos from '../../fungsi/calculatePosition';
import HadithCount from './HadithCount';
import { closeDialogTab } from '../../fungsi/closeDialogTab';
import { currentSizeId } from '../../store/currentScreenSize';
import arrayOfKitabsName from '../../store/arrayOfKitabsName';

import { withRouter } from "react-router";

const styles = {
  // root: {
  //   color: green[600],
  //   '&$checked': {
  //     color: green[500],
  //   },
  // },
  // checked: {},
  setPadding: {
    padding: '0 6px 0 6px',
  },
  checkPadd: {
    padding: 3,
  },
  setMarginRight: {
    marginTop: 6,
    width: 'fit-content',
    marginRight: 1,
    marginLeft: '-4px',
  },
  setTypography: {
    fontSize: '0.875rem',
    lineHeight: 1.43,
    letterSpacing: '0.01071em',
  }
};

class CheckboxLabels extends React.Component {

  shouldComponentUpdate(nextProps) {
    if (this.props.theme.palette.type !== nextProps.theme.palette.type) {
      return true;
    }

    const checkActionProp = () => {
      if (nextProps[this.props.action] !== this.props[this.props.action]) {
        return true;
      } else {
        return false;
      };
    };

    switch (nextProps.elementid) {
      case 0:
        if (nextProps.amountTotal !== this.props.amountTotal) {
          return true;
        };
        return checkActionProp();
      case 1:
        if (nextProps.amountBukhari !== this.props.amountBukhari) {
          return true;
        };
        return checkActionProp();
      case 2:
        if (nextProps.amountMuslim !== this.props.amountMuslim) {
          return true;
        };
        return checkActionProp();
      case 3:
        if (nextProps.amountTirmidzi !== this.props.amountTirmidzi) {
          return true;
        };
        return checkActionProp();
      case 4:
        if (nextProps.amountAbuDaud !== this.props.amountAbuDaud) {
          return true;
        };
        return checkActionProp();
      case 5:
        if (nextProps.amountNasai !== this.props.amountNasai) {
          return true;
        };
        return checkActionProp();
      case 6:
        if (nextProps.amountIbnuMajah !== this.props.amountIbnuMajah) {
          return true;
        };
        return checkActionProp();
      case 7:
        if (nextProps.amountDarimi !== this.props.amountDarimi) {
          return true;
        };
        return checkActionProp();
      case 8:
        if (nextProps.amountAhmad !== this.props.amountAhmad) {
          return true;
        };
        return checkActionProp();
      case 9:
        if (nextProps.amountMalik !== this.props.amountMalik) {
          return true;
        };
        return checkActionProp();
      case 10:
        if (nextProps.amountDaruquthni !== this.props.amountDaruquthni) {
          return true;
        };
        return checkActionProp();
      case 11:
        if (nextProps.amountIbnuKhuzaimah !== this.props.amountIbnuKhuzaimah) {
          return true;
        };
        return checkActionProp();
      case 12:
        if (nextProps.amountIbnuHibban !== this.props.amountIbnuHibban) {
          return true;
        };
        return checkActionProp();
      case 13:
        if (nextProps.amountAlMustadrak !== this.props.amountAlMustadrak) {
          return true;
        };
        return checkActionProp();
      case 14:
        if (nextProps.amountSyafii !== this.props.amountSyafii) {
          return true;
        };
        return checkActionProp();
      default:
        break;
    };
  };

  componentDidUpdate() {
    if (this.props.CHECKBUKHARI &&
      this.props.CHECKMUSLIM &&
      this.props.CHECKTIRMIDZI &&
      this.props.CHECKABUDAUD &&
      this.props.CHECKNASAI &&
      this.props.CHECKIBNUMAJAH &&
      this.props.CHECKDARIMI &&
      this.props.CHECKAHMAD &&
      this.props.CHECKMALIK &&
      this.props.CHECKDARUQUTHNI &&
      this.props.CHECKIBNUKHUZAIMAH &&
      this.props.CHECKIBNUHIBBAN &&
      this.props.CHECKALMUSTADRAK &&
      this.props.CHECKSYAFII) {
      if (this.props.CHECKALL !== true) {
        // set check all to true
        this.props.onBookToSearchChecked(actionTypes.CHECKALLNOT, true);
      };
    } else {
      if (this.props.CHECKALL === true) {
        // set check all to false
        this.props.onBookToSearchChecked(actionTypes.CHECKALLNOT, false);
      };
    };
  };

  handleChange = act => event => {
    this.props.onBookToSearchChecked(act, event.target.checked);
  };

  handleToggleItem = (act) => () => {
    this.props.onBookToSearchChecked(act, !this.props[act]);
  };

  handleClicked = id => (event) => {
    event.preventDefault();
    const pos = calcPos(
      +this.props.amountBukhari,
      +this.props.amountMuslim,
      +this.props.amountTirmidzi,
      +this.props.amountAbuDaud,
      +this.props.amountNasai,
      +this.props.amountIbnuMajah,
      +this.props.amountDarimi,
      +this.props.amountAhmad,
      +this.props.amountMalik,
      +this.props.amountDaruquthni,
      +this.props.amountIbnuKhuzaimah,
      +this.props.amountIbnuHibban,
      +this.props.amountAlMustadrak,
      +this.props.amountSyafii,
      id
    );
    if (pos === undefined) return;
    // after perform search, sometime user open hadith from other way then come back
    // so the total row needs to be set according to total search result
    if (+this.props.totalRow !== this.props.searchResult.length) {
      this.props.onDispatchCountRow(this.props.searchResult.length);
    }
    const keyOfNum = Object.keys(this.props.searchResult[pos])[0];
    const numToKitabName = arrayOfKitabsName[keyOfNum];
    sender('loadCustomData',
      [numToKitabName,
      Object.values(this.props.searchResult[pos])[0],
      pos + 1,
      actionTypes.SEARCHDATA]);
      // set state current shown table name
      if (this.props.shownTable) this.props.onCurrentShownTable('');
      if (currentSizeId === 'xs') {
        // disini cukup ganti urlnya saja, nnti akan mentrigger useEffect() 
        // di TabDialog.js untuk open/menampilkan drawer
        let urlTo = this.props.location.state ? this.props.location.state.ref.replace(/\d+$/, pos + 1) : '/';
        this.props.history.replace(urlTo);
        // closeDialogTab(false, 'left');
      } else {
        let urlTo = (this.props.location.pathname + this.props.location.search).replace(/\d+$/, pos + 1);
        // set url accordingly
        this.props.history.push(urlTo);
      }
  };

  getTotalResult = (id) => {
    switch (id) {
      case 0:
        return this.props.amountTotal;
      case 1:
        return this.props.amountBukhari;
      case 2:
        return this.props.amountMuslim;
      case 3:
        return this.props.amountTirmidzi;
      case 4:
        return this.props.amountAbuDaud;
      case 5:
        return this.props.amountNasai;
      case 6:
        return this.props.amountIbnuMajah;
      case 7:
        return this.props.amountDarimi;
      case 8:
        return this.props.amountAhmad;
      case 9:
        return this.props.amountMalik;
      case 10:
        return this.props.amountDaruquthni;
      case 11:
        return this.props.amountIbnuKhuzaimah;
      case 12:
        return this.props.amountIbnuHibban;
      case 13:
        return this.props.amountAlMustadrak;
      case 14:
        return this.props.amountSyafii;
      default:
        return '';
    }
  };

  render() {
    const { classes, elementid, label, action, variant } = this.props;

    const amountOfSearchResult = this.getTotalResult(elementid) === '' ?
      null :
      <HadithCount label={this.getTotalResult(elementid)} clicked={this.handleClicked} idnumber={elementid} />;

    if (variant === 'listitem') {
      return (
        <ListItem dense button onClick={this.handleToggleItem(action)}>
          <ListItemIcon>
            <Checkbox
              edge="start"
              classes={{ root: classes.checkPadd }}
              icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
              checkedIcon={<CheckBoxIcon fontSize="small" />}
              checked={this.props[action]}
              tabIndex={-1}
              disableRipple
              color='primary'
            />
          </ListItemIcon>
          <ListItemText primary={label} />
          <ListItemSecondaryAction>
            {amountOfSearchResult}
          </ListItemSecondaryAction>
        </ListItem>
      );
    }

    return (
      <FormControlLabel
        classes={{ root: classes.setMarginRight, label: classes.setTypography }}
        label={
          <>
            {label}
            {amountOfSearchResult}
          </>
        }
        control={
          <Checkbox
            classes={{ root: classes.checkPadd }}
            icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
            checkedIcon={<CheckBoxIcon fontSize="small" />}
            checked={this.props[action]}
            onChange={this.handleChange(action)}
            value={action}
            color='primary'
          />
        }
      />
    );
  };
};

CheckboxLabels.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => {
  return {
    CHECKALL: state.checkToSearch.checkAll,
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
    searchResult: state.searchResult.searchResult,
    totalRow: state.mainBooksData.TotalRow,
    shownTable: state.currentTable.shownTable,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onBookToSearchChecked: (action, booL) => dispatch({ type: actionTypes[action], checked: booL }),
    onDispatchCountRow: (rows) => dispatch({ type: actionTypes.TOTALROW, totalRow: rows }),
    onCurrentShownTable: (table) => dispatch({ type: actionTypes.CURRENTTABLE, currentTable: table }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(withTheme(withRouter(CheckboxLabels))));
