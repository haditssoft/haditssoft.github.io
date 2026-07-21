import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';

import { setDispatchSimilarHadith } from '../../../sender/senderDataRequest';
import { connect } from 'react-redux';
import { SIMILARDATA, SHOWSIMILAR } from '../../../store/action';
import KitabAndSubNumber from '../Components/KitabAndSubNumber';
import HeaderSimilar from '../Components/HeaderSimilar';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
}));

const NestedList = props => {
  const classes = useStyles();
  
  const propsForSimilarHadith = () => {
    return {
      onStoreSimilarData: props.onStoreSimilarData,
      showSimilar: props.showSimilar,
      onShowSimilar: props.onShowSimilar
    }
  }

  useEffect(() => {
    setDispatchSimilarHadith(propsForSimilarHadith);
  }, [props.showSimilar]); // [] so that it behaves like componentDidMount & componentWillUnmount

  
  let similarComponent = null;
  if (props.showSimilar) {
    similarComponent = (
      <List
        component="nav"
        aria-labelledby="similar-list-subheader"
        subheader={<HeaderSimilar totalSimilar={props.similarData.length} />}
        className={classes.root}
      >
        <KitabAndSubNumber similarData={props.similarData} />
      </List>
    );
  };
  
  return similarComponent;
}

const mapStateToProps = state => {
    return {
        similarData: state.similar.similarData,
        showSimilar: state.displaySimilar.showSimilar
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onStoreSimilarData: (value) => dispatch({ type: SIMILARDATA, data: value }),
        onShowSimilar: (booLean) => dispatch({ type: SHOWSIMILAR, show: booLean })
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(NestedList));