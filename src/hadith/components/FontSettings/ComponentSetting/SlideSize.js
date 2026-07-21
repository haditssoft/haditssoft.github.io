import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, withTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';

import { connect } from 'react-redux';
import { SETARABICFONT, SETINDOFONT } from '../../../store/action';


const styles = theme => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    margin: '5px 8px 16px',
    width: 'auto',
  },
  sliderRoot: {
    width: '30%',
    marginLeft: '15%',
    alignSelf: 'center',
    position: 'absolute',
  },
  slider: {
    padding: '22px 0',
  },
  setLineHeight: {
    lineHeight: 2.6,
    color: (theme.palette.type === 'light') ? '#303F9F' : '#007ACC'
  },
});

class SlideSize extends React.Component {

  shouldComponentUpdate(nextProps) {
    if (this.props.theme.palette.type !== nextProps.theme.palette.type) {
      return true;
    }
    if (this.props.lang === 'arabic' && this.props.arabicFont[3] !== nextProps.arabicFont[3]) {
      return true;
    } else if (this.props.lang === 'indo' && this.props.indoFont[3] !== nextProps.indoFont[3]) {
      return true;
    };
    return false;
  };

  handleChange = (event, value) => {
    let firstPortion;
    let finalFont;
    if (this.props.lang === 'arabic') {
      // current font: ['Scheherazade', 'serif', 400, 31]
      firstPortion = this.props.arabicFont.slice(0, 3); // remove the last: ['Scheherazade', 'serif', 400]
      // insert new value at last index: ['Scheherazade', 'serif', 400, value]
      finalFont = [...firstPortion, value];
      this.props.onSetArabicFont(finalFont);
    } else {
      firstPortion = this.props.indoFont.slice(0, 3);
      finalFont = [...firstPortion, value];
      this.props.onSetIndoFont(finalFont);
    };
  };

  render() {
    const { classes, lang, arabicFont, indoFont } = this.props;

    return (
      <div className={classes.root}>
        <Typography className={classes.setLineHeight} component='span' variant='body1'>
          {lang === 'arabic' ? arabicFont[3] : indoFont[3]}
        </Typography>
        <Slider
          min={8}
          max={112}
          step={1}
          classes={{ root: classes.sliderRoot }}
          value={lang === 'arabic' ? arabicFont[3] : indoFont[3]}
          onChange={this.handleChange}
        />
      </div>
    );
  }
}

SlideSize.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(withTheme(SlideSize)));
