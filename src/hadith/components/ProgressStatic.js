import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

import { connect } from 'react-redux';
import * as actionTypes from '../store/action';


class CircularStatic extends React.Component {
  state = {
    completed: 0,
  };

  timer;

  componentDidMount() {
    this.timer = setInterval(this.progress, 100);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  progress = () => {
    const { completed } = this.state;
    if (completed === 100) {
      clearInterval(this.timer);
      this.props.onShowHideSnackBars(false, this.props.messageSnackBar);
    };
    this.setState({ completed: completed >= 100 ? 0 : completed + (this.props.opaq === 'warning' ? 1 : 4) });
  };

  render() {
    const { opaq } = this.props;
    return (      
        <CircularProgress
          style={opaq === 'warning' ? { opacity: '1' } : { opacity: '0.0' } }
          variant="static"
          value={this.state.completed}
          size={36}
        />
    );
  }
}

const mapPropsToState = state => {
  return {
      messageSnackBar: state.snackBarsSetting.messageSnackBar
  };
};

const mapDispatchToState = dispatch => {
  return {
      onShowHideSnackBars: (booLean, mess) => dispatch({
          type: actionTypes.OPENSNACKBARS,
          show: booLean,
          message: mess
      })
  };
};

export default connect(mapPropsToState, mapDispatchToState)(CircularStatic);
