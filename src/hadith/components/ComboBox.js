import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
// import Collapse from '@material-ui/core/Collapse';

import * as actionTypes from '../store/action';
import { connect } from 'react-redux';
import sender, { setDispatchKitab, setDispatchBab } from '../sender/senderDataRequest';
import KitabAndBab from './items/KitabAndBab';

const useStyles = makeStyles(theme => ({
  root: {
    order: 2,
    display: 'flex',
    // flex: '1 1 auto',
    backgroundColor: theme.palette.type === 'dark' ? theme.palette.background.paper : undefined
  },
  // setOrder: {
  //   order: 2
  // },
  setFontSize: {
    [theme.breakpoints.down('xs')]: {
      fontSize: '0.875rem'
    }
  }
}));

const SimpleSelect = props => {
  const classes = useStyles();

  useEffect(() => {
    const propsForResultKitab = () => {
      return {
        kitab: props.kitab,
        onDispatchResultKitab: props.onDispatchResultKitab
      }
    }
    
    setDispatchKitab(propsForResultKitab);
  }, [props.kitab]);
  
  useEffect(() => {  
    const propsForResultBab = () => {
      return {
        bab: props.bab,
        onDispatchResultBab: props.onDispatchResultBab
      }
    }

    setDispatchBab(propsForResultBab);
  }, [props.bab]);

  const handleChangeKitab = event => {
    // Put the value of MenuItem to the state to show the coresponding kitab's name
    props.onSettingShownKitab(event.target.value);
    // After selecting kitab, show the coresponding hadits (get from database)
    sender('loadMainData', [props.shownTable, props.kitab[event.target.value - 1].Awalan]);
  };

  const handleChangeBab = (event, child) => {
    // Put the value of MenuItem to the state to show the coresponding bab's name
    props.onSettingShownBab(event.target.value);
    // After selecting bab, show the coresponding hadits (get from database)
    // The use of child.props.index because bab doesn't load all of its data rows as of in kitab
    // The event.target.value cannot represent the current index of the displayed bab
    // for instance event.target.value could be thousands (3938) where as bab just contain tenth items
    sender('loadMainData', [props.shownTable, props.bab[child.props.index].AwalanBab]);
  };

  // Transform KitabData Into JSX Item For ComboBox
  const itemKitab = props.kitab.map((eachItem) => {
    return (
      <MenuItem className={classes.setFontSize} key={eachItem.VMember} value={eachItem.VMember}>
        {eachItem.NKitab}
      </MenuItem>
    );
  });

  // Transform BabData Into JSX Item For ComboBox
  let itemBab = [];
  if (props.bab.length !== 0) {
    itemBab = props.bab.map((eachItem, idx) => {
      return (
        <MenuItem className={classes.setFontSize} key={eachItem.VMemberBab} value={eachItem.VMemberBab} index={idx}>
          {eachItem.NBab}
        </MenuItem>
      );
    });
  }

  return (
    // <Collapse style={{ minHeight: '' }} className={classes.setOrder} timeout={800} in={props.isVisible}>
    <form className={classes.root} autoComplete="off">
      <KitabAndBab
        identity='Kitab'
        value={props.shownKitab}
        changed={handleChangeKitab}
        name='ShownKitab'
        id='outlined-kitab-simple'
        itemContent={itemKitab}
        kitab={props.kitab}
      />

      <KitabAndBab
        identity='Bab'
        value={props.shownBab}
        changed={handleChangeBab}
        name='ShownBab'
        id='outlined-bab-simple'
        itemContent={itemBab}
        kitab={props.kitab}
        bab={props.bab}
      />
    </form>
    // </Collapse>
  );
}

const mapStateToProps = state => {
  return {
    kitab: state.kitabData.Kitab,
    bab: state.babData.Bab,
    shownKitab: state.valueOfShownKitab.ShownKitab,
    shownBab: state.valueOfShownKitab.ShownBab,
    shownTable: state.currentTable.shownTable,
    // isVisible: state.showKitabNBab.isVisible
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onDispatchResultKitab: (rows) => dispatch({ type: actionTypes.KITABDATA, kitabData: rows }),
    onDispatchResultBab: (rows) => dispatch({ type: actionTypes.BABDATA, babData: rows }),
    onSettingShownKitab: (val) => dispatch({ type: actionTypes.SHOWNKITABVALUE, value: val }),
    onSettingShownBab: (val) => dispatch({ type: actionTypes.SHOWNBABVALUE, value: val })
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(SimpleSelect));
