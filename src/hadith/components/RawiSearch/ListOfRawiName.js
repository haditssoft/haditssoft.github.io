import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import PersonIcon from '@material-ui/icons/Person';

import { connect } from 'react-redux';
import getBgColorRawi from '../../fungsi/getBgColorRawi';
import sender from '../../sender/senderDataRequest';
import { ISNARRATORSELECTED } from '../../store/action';

const useStyles = makeStyles(theme => ({
  personColor: {
    color: theme.palette.type === 'dark' ? theme.palette.grey['400'] : undefined
  }
}));

const ListOfRawiName = props => {
  const classes = useStyles();
  const { style, resultRawi, isSelected } = props;
  let { index } = props;

  const handleClick = kodeRawi => () => {
    if (props.narrator.length === 0 ||
      props.openProfile === false ||
      props.openProfile === true &&
      props.narrator[0]['KodeRawi'] !== kodeRawi) {
      sender('loadScholarComment', [kodeRawi]);
      // let this be after load scholar comment
      // so that props.onShowProfile(true); being called after all datas are ready
      // props.onShowProfile(true); called in dispatchCompleteProfile() in RawiQuery
      sender('loadCompleteProfile', [kodeRawi]);
      props.onWhichRawiIsSelected(kodeRawi);
    }
  };

  if (resultRawi[index]['Nama'] === null) {
    index += 1;
  }
  
  const BgColor = getBgColorRawi(resultRawi[index]['Quality']);

  const rawisName = resultRawi[index]['Nama'];

  return (
    <ListItem
      dense
      disableGutters
      divider
      button
      style={{ ...style, paddingLeft: 8, paddingRight: 8 }} //width: '92%', marginLeft: '4%'
      key={index}
      onClick={handleClick(resultRawi[index]['KodeRawi'])}
      selected={resultRawi[index]['KodeRawi'] === isSelected}
    >
      <ListItemAvatar>
        <Avatar
          style={{
            color: '#fff',
            backgroundColor: typeof BgColor !== 'string' ? BgColor[500] : BgColor
          }}
        >
          <PersonIcon className={classes.personColor} />
        </Avatar>
      </ListItemAvatar>
      <ListItemText
        primaryTypographyProps={{ color: 'textPrimary' }}
        primary={
          rawisName.length > 55 ?
            rawisName.substring(0, 56) + '...' :
            rawisName
        } />
    </ListItem>
  );
};

ListOfRawiName.propTypes = {
  index: PropTypes.number,
  style: PropTypes.object,
};

const mapStateToProps = state => {
  return {
    resultRawi: state.resultOfSearchRawi.resultRawi,
    narrator: state.clickedNarrator.narrator,
    isSelected: state.clickedNarrator.isSelected,
    openProfile: state.showProfile.openProfile,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onWhichRawiIsSelected: (num) => dispatch({ type: ISNARRATORSELECTED, selected: num }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(ListOfRawiName));