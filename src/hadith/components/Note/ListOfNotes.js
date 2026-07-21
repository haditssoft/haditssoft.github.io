import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import BookIcon from '@material-ui/icons/Book';
import AssignmentOutlinedIcon from '@material-ui/icons/AssignmentOutlined';

import getKitabRealName from '../../fungsi/getKitabRealName';
import getKitabName from '../../fungsi/getKitabName';
import sender from '../../sender/senderDataRequest';
import { connect } from 'react-redux';
import { CURRENTTABLE, EXPANDCOLLAPSE, TITLEFORLOAD, BOOKMARKTABLE } from '../../store/action';
// import getBgColorRawi from '../../fungsi/getBgColorRawi';

const useStyles = makeStyles(theme => ({
  root: {
    minWidth: 49,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
  multiline: {
    margin: '4px 0',
  },
}));

const kitabID = [
  'bukharinote',
  'muslimnote',
  'tirmidzinote',
  'abudaudnote',
  'nasainote',
  'ibnumajahnote',
  'dariminote',
  'ahmadnote',
  'maliknote',
  'daruquthninote',
  'ibnukhuzaimahnote',
  'ibnuhibbannote',
  'mustadraknote',
  'syafiinote',
];

const ListOfNotes = (props) => {
  const classes = useStyles();
  const { data, index, style } = props;
  
  const listValue = data.allNotes[0][index];
  const realKitabName = getKitabRealName(listValue);
  let toBeRenderComp;
  let kitabNameEachIteration;

  const handleSelectNote = bookName => () => {
    const realBookName = getKitabName(getKitabRealName(bookName));
    const numberHadith = listValue.substring(0, listValue.indexOf(':'));
    sender('loadMainData', [realBookName, +numberHadith]);
    // set state current shown table name
    props.onCurrentShownTable(realBookName);
    // collapse the opened panel in kedudukan or in tema
    if (props.expandKedudukan !== false && props.expandKedudukan !== null ||
      props.expandTema !== false && props.expandTema !== null) {
      props.onExpandingPanel([false, false]);
    }
    // unselect value selected in bookmark tampilkan combobox
    if (props.titleForLoad !== '') {
      props.onTitleForLoadChanged('');
      props.onStoreBookmarkTable({});
    }
  }
  
  if (realKitabName) {
    toBeRenderComp = (
      <ListItem
        disableGutters={true}
        button
        key={index}
        style={{...style, width: '92%', marginLeft: '4%'}}
        onClick={data.handleExpand(listValue)}
      >
        <ListItemIcon className={classes.root}>
          <BookIcon />
        </ListItemIcon>
        <ListItemText primary={
            <React.Fragment>
                {realKitabName}
                <span style={{ paddingLeft: '15px' }}></span>
                {'(' + data.allNotes[1][listValue] + ')'}
            </React.Fragment>
          } 
        />
        {data.open.includes(listValue) ? <ExpandMoreIcon /> : <ExpandLessIcon />}
      </ListItem>
    );
  } else {
    const sumAll = Object.values(data.allNotes[1]).reduce((total, num) => total + num, 0);
    for (let i = 1, n = sumAll + 1; i < n; i++) {
      const getNameOfKitab = data.allNotes[0][index - i];
        
      if (kitabID.includes(getNameOfKitab)) {
        kitabNameEachIteration = getNameOfKitab;
        break;
      }
    }
    toBeRenderComp = (
          <ListItem
            key={index}
            style={{...style, width: '92%', marginLeft: '4%'}}
            disableGutters={true}
            divider
            button
            onClick={handleSelectNote(kitabNameEachIteration)}
            className={classes.nested}
          >
            <ListItemIcon>
                <AssignmentOutlinedIcon />
            </ListItemIcon>
            <ListItemText
              classes={{ multiline: classes.multiline }}
              primaryTypographyProps={{ component: 'p', gutterBottom: true }}
              secondaryTypographyProps={{ noWrap: true }}
              primary={'No. ' + listValue.substring(0, listValue.indexOf(':'))}
              secondary={'... ... ... ... ...'} // listValue.substring(listValue.indexOf(':') + 1)
            />
          </ListItem>
    );
  }
  
  return toBeRenderComp;
  
}

const mapStateToProps = state => {
  return {
    expandKedudukan: state.expandedPanel.expandKedudukan,
    expandTema: state.expandedPanel.expandTema,
    titleForLoad: state.inputComboValue.titleForLoad,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onCurrentShownTable: (table) => dispatch({ type: CURRENTTABLE, currentTable: table }),
    onExpandingPanel: (arrAy) => dispatch({ type: EXPANDCOLLAPSE, nameOrfalse: arrAy }),
    onTitleForLoadChanged: (teks) => dispatch({ type: TITLEFORLOAD, value: teks }),
    onStoreBookmarkTable: (obj) => dispatch({ type: BOOKMARKTABLE, value: obj }),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(ListOfNotes));