import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, withTheme } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import { connect } from 'react-redux';
import { RADIOCHECKED, SETTRANSLATIONLANG } from '../../store/action';

const styles = theme => ({
  root: {
    display: 'flex',
  },
  marginLabel: {
    marginLeft: '-8px',
  },
  setPadding: {
    marginLeft: 0,
    '& > :first-child': {
      paddingTop: 4,
      paddingBottom: 4
    }
  },
  setLabel: {
    fontSize: "0.875rem",
    lineHeight: 1.43,
    letterSpacing: "0.01071em"
  }
});

class RadioButtonsGroup extends React.Component {

  shouldComponentUpdate(nextProps) {
    if (this.props.theme.palette.type !== nextProps.theme.palette.type) {
      return true;
    }
    if (this.props.group === 'bookmark') {
      if (this.props.radioBookmark !== nextProps.radioBookmark) {
        return true;
      }
    } else if (this.props.group === 'translationlang') {
      if (this.props.radioTranslationLang !== nextProps.radioTranslationLang) {
        return true;
      }
    }
    return false;
  }

  handleChange = (idx, group) => event => {
    if (group === 'bookmark') {
      this.props.onRadioBookmarkChecked(idx);
    } else if (group === 'translationlang') {
      this.props.onRadioTranslationLangChecked(this.props.value);
    }
  };

  render() {
    const { classes, radioBookmark, radioTranslationLang, group, idx, value, label } = this.props;

    let classesStyle;
    let checkedState;

    if (group === 'bookmark') {
      classesStyle = { root: classes.marginLabel };
      checkedState = radioBookmark === idx;
    } else {
      classesStyle = { root: classes.setPadding, label: classes.setLabel };
      checkedState = radioTranslationLang === value;
    }

    return (
      <div className={classes.root}>
        <FormControlLabel
          classes={classesStyle}
          checked={checkedState}
          onChange={this.handleChange(idx, group)}
          value={group}
          control={<Radio color='primary' />}
          label={label}
        />
      </div>
    );
  }
}

RadioButtonsGroup.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => {
  return {
    radioBookmark: state.controlRadioCheck.radioBookmark,
    radioTranslationLang: state.translationLang.language
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onRadioBookmarkChecked: (idx) => dispatch({ type: RADIOCHECKED, checked: idx }),
    onRadioTranslationLangChecked: (language) => dispatch({ type: SETTRANSLATIONLANG, language: language })
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(withTheme(RadioButtonsGroup)));
