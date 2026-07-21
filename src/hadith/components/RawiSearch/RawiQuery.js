import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';

import InputRawiSearch from '../items/TextField';
import { connect } from 'react-redux';
import RawiResult from './RawiResult';
import sender, { setDispatchListOfNarratorName, setDispatchCompleteProfile } from '../../sender/senderDataRequest';
import { SEARCHRAWIRESULT, CLICKEDNARRATOR, SHOWPROFILE, DIALOGPROFILERAWI } from '../../store/action';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  toFlextColumn: {
    flexDirection: 'column',
    paddingTop: 0,
    paddingBottom: 0,
  },
  button: {
    margin: theme.spacing(1),
  },
  // marginBottomToNull: {
  //   '&$expanded': {
  //     marginBottom: 0,
  //   },
  // },
  // expanded: {},
}));

const kalanganOfRawi = [
  '',
  'Shahabat',
  'Shahabiyah',
  'Tabi\'ut Tabi\'in Kalangan Biasa',
  'Tabi\'ut Tabi\'in Kalangan Tua',
  'Tabi\'in Kalangan Pertengahan',
  'Tabi\'in Kalangan Biasa',
  'Tabi\'in (Tdk Jumpa Shahabat)',
  'Tabi\'ut Tabi\'in Kalangan Pertengahan',
  'Tabi\'in Kalangan Tua',
  'Tabi\'ul Atba\' Kalangan Tua',
  'Tabi\'ul Atba\' Kalangan Pertengahan',
  'Tabi\'ul Atba\' Kalangan Biasa'
];

const levelOfRawi = [
  ['', ''],
  ['1. ', 'Shahabat'],
  ['2. ', 'Tsiqah Tsiqah / Tsiqah Hafidh'],
  ['3. ', 'Tsiqah \'Adil'],
  ['4. ', 'Shaduq La Ba\'sa Bih'],
  ['5. ', 'Buruk Hafalannya'],
  ['6. ', 'Maqbul'],
  ['7. ', 'Majhul Hal'],
  ['8. ', 'Dha\'if'],
  ['9. ', 'Tidak Dipercaya / Majhul'],
  ['10. ', 'Matruk'],
  ['11. ', 'Tertuduh Berdusta'],
  ['12. ', 'Kadzab (Pendusta)']
];

const menuItemKalangan = kalanganOfRawi.map((kalangan, idx) => (
  <MenuItem key={kalangan + idx} value={kalangan}>
    {kalangan.replace('Kalangan ', '')}
  </MenuItem>
));

const menuItemLevel = levelOfRawi.map(level => (
    <MenuItem key={level[1]} value={level[0]}>
      {level[0] + level[1]}
    </MenuItem>
));

const RawiQuery = (props) => {
  const classes = useStyles();
  const { nameValue, kunyahValue, kalanganValue, levelValue, resultRawi } = props;
  
  const [expand, setExpand] = useState(true);

  useEffect(() => {
    const propsForListOfNarratorName = () => {
      return {
        onStoreResultRawi: props.onStoreResultRawi
      };
    }
    
    const propsForCompleteProfile = () => {
      return {
        onStoreCompleteProfile: props.onStoreCompleteProfile,
        openProfile: props.openProfile,
        onShowProfile: props.onShowProfile,
        onShowDialogProfileRawi: props.onShowDialogProfileRawi
      };
    }

    setDispatchListOfNarratorName(propsForListOfNarratorName);
    setDispatchCompleteProfile(propsForCompleteProfile);
  }, [props.openProfile]);

  const handleClick = () => {
    setExpand(false);
    if (props.openProfile) props.onShowProfile(false);
    sender('loadListOfRawiName', [nameValue, kunyahValue, kalanganValue, levelValue]);    
  };

  const handleChange = (event, expanded) => {
    setExpand(expanded);
  };

  return (
    <React.Fragment>
      <div className={classes.root}>
        <ExpansionPanel
          // classes={{ root: classes.marginBottomToNull, expanded: classes.expanded }}
          square elevation={0} expanded={expand} onChange={handleChange}
        >
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography className={classes.heading}>Search Query</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails className={classes.toFlextColumn}>
              <InputRawiSearch
                  id='rawiSearchNama'
                  watermark='Nama'
                  select={false}
                  require={false}
                  child={null}
                  text={nameValue}
                  helper=''
                  handleSearch={handleClick}
              />
              <InputRawiSearch
                  id='rawiSearchKunyah'
                  watermark='Kunyah'
                  select={false}
                  require={false}
                  child={null}
                  text={kunyahValue}
                  helper=''
                  handleSearch={handleClick}
              />
              <InputRawiSearch
                  id='rawiSearchKalangan'
                  watermark='Kalangan'
                  select={true}
                  require={false}
                  child={menuItemKalangan}
                  text={kalanganValue}
                  helper=''
              />
              <InputRawiSearch
                  id='rawiSearchLevel'
                  watermark='Level'
                  select={true}
                  require={false}
                  child={menuItemLevel}
                  text={levelValue}
                  helper=''
              />
              <Button color="primary" className={classes.button} onClick={handleClick}>
                  Search
              </Button>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        {resultRawi ? <RawiResult /> : resultRawi} {/* resultRawi is either null or array */}
      </div>
    </React.Fragment>
  );
};

const mapStateToProps = state => {
    return {
        nameValue: state.queryValue.nameValue,
        kunyahValue: state.queryValue.kunyahValue,
        kalanganValue: state.queryValue.kalanganValue,
        levelValue: state.queryValue.levelValue,
        openProfile: state.showProfile.openProfile,
        resultRawi: state.resultOfSearchRawi.resultRawi,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onStoreResultRawi: (arRay) => dispatch({ type: SEARCHRAWIRESULT, value: arRay }),
        onStoreCompleteProfile: (arRay) => dispatch({ type: CLICKEDNARRATOR, data: arRay }),
        onShowProfile: (booLean) => dispatch({ type: SHOWPROFILE, open: booLean }),
        onShowDialogProfileRawi: (str) => dispatch({ type: DIALOGPROFILERAWI, show: str })
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(RawiQuery));