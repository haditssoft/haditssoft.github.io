import React from 'react';
import { withStyles, withTheme } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import LinearProgress from '@material-ui/core/LinearProgress';
import { connect } from 'react-redux';

import SelectionControl from './SelectionControl';
import { CHECKBUKHARI,
  CHECKMUSLIM,
  CHECKTIRMIDZI,
  CHECKABUDAUD,
  CHECKNASAI,
  CHECKIBNUMAJAH,
  CHECKDARIMI,
  CHECKAHMAD,
  CHECKMALIK,
  CHECKDARUQUTHNI,
  CHECKIBNUKHUZAIMAH,
  CHECKIBNUHIBBAN,
  CHECKALMUSTADRAK,
  CHECKSYAFII,
  CHECKALL } from '../../store/action';

const styles = theme => ({
  root: {
    width: '100%',
    position: 'relative',
  },
  linearProgress: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
  },
});

class ControlledExpansionPanels extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.theme.palette.type !== nextProps.theme.palette.type) {
      return true;
    }
    if (this.props.isSearching !== nextProps.isSearching) {
      return true;
    }
    return false;
  }

  render() {
    const { classes } = this.props;

    const selectionControls = [
      {label: 'Shahih Bukhari', action: CHECKBUKHARI},
      {label: 'Shahih Muslim', action: CHECKMUSLIM},
      {label: 'Sunan Tirmidzi', action: CHECKTIRMIDZI},
      {label: 'Sunan Abu Daud', action: CHECKABUDAUD},
      {label: "Sunan Nasa'i", action: CHECKNASAI},
      {label: 'Sunan Ibn Majah', action: CHECKIBNUMAJAH},
      {label: 'Sunan Darimi', action: CHECKDARIMI},
      {label: 'Musnad Ahmad', action: CHECKAHMAD},
      {label: "Muwatha' Malik", action: CHECKMALIK},
      {label: 'Sunan Daruquthni', action: CHECKDARUQUTHNI},
      {label: 'Shahih Ibn Khuzaimah', action: CHECKIBNUKHUZAIMAH},
      {label: 'Shahih Ibn Hibban', action: CHECKIBNUHIBBAN},
      {label: 'Al Mustadrak', action: CHECKALMUSTADRAK},
      {label: "Musnad Syafi'i", action: CHECKSYAFII}
    ].map((obj, idx) => <SelectionControl key={idx + 1} elementid={idx + 1} label={obj.label} action={obj.action} variant="listitem" />)

    return (
      <div className={classes.root}>
        {this.props.isSearching && <LinearProgress classes={{ root: classes.linearProgress }} />}
        <List dense>
          <SelectionControl key={0} elementid={0} label='Semua' action={CHECKALL} variant="listitem" />
          {selectionControls}
        </List>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isSearching: state.isSearching.isSearching,
  };
};

export default connect(mapStateToProps)(withStyles(styles)(withTheme(ControlledExpansionPanels)));
