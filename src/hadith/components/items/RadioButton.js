import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, withTheme } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import { connect } from 'react-redux';
import { RADIOCHECKED, RADIOMODECARICHECKED, SEARCHENDPOINTMODE } from '../../store/action';
import { switchServer, authFetch } from '../../sender/api';

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
    } else if (this.props.group === 'searchendpoint') {
      if (this.props.radioSearchEndpoint !== nextProps.radioSearchEndpoint) {
        if (this.props.idx === this.props.radioSearchEndpoint || nextProps.idx === nextProps.radioSearchEndpoint) {
          return true;
        }
      }
    } else {
      if (this.props.radioModeCari !== nextProps.radioModeCari) {
        if (this.props.idx === this.props.radioModeCari || nextProps.idx === nextProps.radioModeCari) {
          return true;
        }
      }
    }
    return false;
  }

  handleChange = (idx, group) => event => {
    if (group === 'bookmark') {
      this.props.onRadioBookmarkChecked(idx);
    } else if (group === 'searchendpoint') {
      this.props.onSearchEndpointModeChecked(idx);
    } else {
      this.props.onRadioModeCariChecked(idx);
      const token = localStorage.getItem('token');
      if (token) {
        authFetch(switchServer + 'search-mode', {
          method: 'PUT',
          body: JSON.stringify({ search_mode: idx })
        })
          .then(res => {
            if (!res.ok) {
              throw new Error('Failed to save search mode setting');
            }
            return res;
          })
          .catch(err => console.log(err));
      }
    }
  };

  render() {
    const { classes, radioBookmark, radioModeCari, radioSearchEndpoint, group, idx, label } = this.props;

    let classesStyle;
    let checkedState;

    if (group === 'bookmark') {
      classesStyle = { root: classes.marginLabel };
      checkedState = radioBookmark === idx;
    } else if (group === 'searchendpoint') {
      classesStyle = { root: classes.setPadding, label: classes.setLabel };
      checkedState = radioSearchEndpoint === idx;
    } else {
      classesStyle = { root: classes.setPadding, label: classes.setLabel };
      checkedState = radioModeCari === idx;
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
    radioModeCari: state.controlRadioCheck.radioModeCari,
    radioSearchEndpoint: state.controlRadioCheck.radioSearchEndpoint
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onRadioBookmarkChecked: (idx) => dispatch({ type: RADIOCHECKED, checked: idx }),
    onRadioModeCariChecked: (idx) => dispatch({ type: RADIOMODECARICHECKED, checked: idx }),
    onSearchEndpointModeChecked: (idx) => dispatch({ type: SEARCHENDPOINTMODE, checked: idx })
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(withTheme(RadioButtonsGroup)));
