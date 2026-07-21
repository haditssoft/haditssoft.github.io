import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, withTheme } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import IconAndLabelLined from './items/IconAndLabelLined';
import Grid from '@material-ui/core/Grid';

import prepareSenderKedudukan from '../fungsi/prepareSenderKedudukan';
import { CURRENTTABLE, NUMBEREACHBOOKS, EXPANDCOLLAPSE, TITLEFORLOAD, BOOKMARKTABLE } from '../store/action';
import { connect } from 'react-redux';
import * as detailsPerBook from '../store/totalHaditsEachBook';
import ButtonLink from './items/ButtonLink';
import sender from '../sender/senderDataRequest';
import setOpenedTableName from '../store/openedTableName';
import { currentSizeId } from '../store/currentScreenSize';
import { closeDialogTab } from '../fungsi/closeDialogTab';

const styles = theme => ({
  getRidLine: {
    '&:before': {
      height: 0
    }
  },
  root: {
    width: '100%',
  },
  reducePadding: {
    padding: '8px 8px 24px'
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  getRidPadding: {
    padding: 0,
    '&:hover': {
      backgroundColor: theme.palette.action.hover,
    }
  },
  content: {
    margin: 0,
    // '& > :last-child' : {
    //   paddingRight: 0
    // },
    '&$expanded': {
      margin: '20px 0 0 0'
    }
  },
  expanded: {},
});

class ControlledExpansionPanels extends React.Component {

  shouldComponentUpdate(nextProps) {
    if (this.props.theme.palette.type !== nextProps.theme.palette.type) {
      return true;
    }
    if (this.props.iconlabel[0].panel === 'KumpulanAlQuran') {
      if (nextProps.expandKedudukan === this.props.expandKedudukan) {
        return false;
      } else {
        return true;
      };
    } else {
      if (nextProps.expandTema === this.props.expandTema) {
        return false;
      } else {
        return true;
      };
    };
  };

  handleChange = panel => (event, expanded) => {
    let tic = 0;
    if (expanded && panel !== this.props.shownTable) {
      tic = 120;
      // will be use in senderDataRequest.js for saving lastread
      setOpenedTableName(panel);
      // kedudukan dan tema digabung jd satu chanel 'classificationData'
      prepareSenderKedudukan('classificationData', panel);
      // set state current shown table name
      this.props.onCurrentShownTable(panel);
      // set state to show number of hadits in each book
      this.props.onDetailsHaditsPerBooks(detailsPerBook[panel]);
      // unselect value selected in bookmark tampilkan combobox
      if (this.props.titleForLoad !== '') {
        this.props.onTitleForLoadChanged('');
        this.props.onStoreBookmarkTable({});
      }
    }

    // Set a delay so that the animation can work
    setTimeout(() => {
      if (this.props.iconlabel[0].panel === 'KumpulanAlQuran') {
        this.props.onExpandingPanel(expanded ? [panel, false] : [false, false]);
      } else {
        this.props.onExpandingPanel(expanded ? [false, panel] : [false, false]);
      }
    }, tic);
  };

  handleCloseDialogTab = () => {
    if (currentSizeId === 'xs') {
      setTimeout(() => {
        closeDialogTab(false, 'left');
      }, 500);
    }
  }

  handleClicked = (mainKitab, bookNumber) => () => {
    // set initial value to 1 bcoz if bookNumber = 0 which is Bukhari, it won't loop to increase the value
    // while position is needed in sender(), so that it'll show hadits in position number 1 (Bukhari)
    let position = 1;
    for (let idx = 0; idx < bookNumber; idx++) {
      // detailsPerBook is reference to JS file totalHaditsEachBook.js
      // this.props.shownTable is hold variable name of array namely: e.g. KumpulanAlQuran
      // [idx] is index number of the array: e.g. [703, 318, 433, 230, 164, 132, 137, 947, 40];
      // bookNumber is index position where loop should stop before reach it
      position += detailsPerBook[this.props.shownTable][idx];
      // if bookNumber is 2 (index), then it'll start to increase position by 703 then 318 and then stop
      // in the end position hold value of 1022 (first number of tirmidzi book)
    };
    // Inside array example > [SunanTirmidzi, KumpulanAlQuran, 1022]
    sender('classificationData', [mainKitab, position, this.props.shownTable]);
    if (currentSizeId === 'xs') {
      closeDialogTab(false, 'left');
    }
  };

  render() {
    const { classes, iconlabel, expandKedudukan, expandTema } = this.props;
    const {
      bukhari,
      muslim,
      tirmidzi,
      abuDaud,
      nasai,
      ibnuMajah,
      darimi,
      ahmad,
      malik
    } = this.props.totalHaditsPerBook;

    const listButton = iconlabel.map((obj, idx) => {

      let expanded = false;

      if (iconlabel[0].panel === 'KumpulanAlQuran') {
        // for kedudukan
        expanded = expandKedudukan === obj.panel;
      } else {
        // for tema
        expanded = expandTema === obj.panel;
      };

      return (
        <ExpansionPanel
          classes={{ root: classes.getRidLine }}
          TransitionProps={{ onEntered: this.handleCloseDialogTab, unmountOnExit: true }}
          square
          elevation={0}
          key={obj.label + idx}
          expanded={expanded}
          onChange={this.handleChange(obj.panel)}
        >
          <ExpansionPanelSummary
            disableRipple={false}
            disableTouchRipple={false}
            focusRipple={true}
            classes={{
              root: classes.getRidPadding,
              content: classes.content,
              expanded: classes.expanded
            }}
          >
            <IconAndLabelLined gutter={false} icon={obj.icon} label={obj.label} />
          </ExpansionPanelSummary>
          <ExpansionPanelDetails className={classes.reducePadding}>
            <Grid container justify='space-evenly'>
              <Grid item>
                <Typography variant='caption' display='block' gutterBottom>
                  Bukhari: <ButtonLink linkColor='' textLabel={bukhari} clicked={this.handleClicked('ShahihBukhari', 0)} />
                </Typography>
                <Typography variant='caption' display='block' gutterBottom>
                  Muslim: <ButtonLink linkColor='' textLabel={muslim} clicked={this.handleClicked('ShahihMuslim', 1)} />
                </Typography>
                <Typography variant='caption' display='block' gutterBottom>
                  Tirmidzi: <ButtonLink linkColor='' textLabel={tirmidzi} clicked={this.handleClicked('SunanTirmidzi', 2)} />
                </Typography>
                <Typography variant='caption' display='block' gutterBottom>
                  Abu Daud: <ButtonLink linkColor='' textLabel={abuDaud} clicked={this.handleClicked('SunanAbuDaud', 3)} />
                </Typography>
                <Typography variant='caption' display='block'>
                  Nasa'i: <ButtonLink linkColor='' textLabel={nasai} clicked={this.handleClicked('SunanNasai', 4)} />
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant='caption' display='block' gutterBottom>
                  Ibnu Majah: <ButtonLink linkColor='' textLabel={ibnuMajah} clicked={this.handleClicked('SunanIbnuMajah', 5)} />
                </Typography>
                <Typography variant='caption' display='block' gutterBottom>
                  Darimi: <ButtonLink linkColor='' textLabel={darimi} clicked={this.handleClicked('SunanDarimi', 6)} />
                </Typography>
                <Typography variant='caption' display='block' gutterBottom>
                  Ahmad: <ButtonLink linkColor='' textLabel={ahmad} clicked={this.handleClicked('MusnadAhmad', 7)} />
                </Typography>
                <Typography variant='caption' display='block'>
                  Malik: <ButtonLink linkColor='' textLabel={malik} clicked={this.handleClicked('MuwathaMalik', 8)} />
                </Typography>
              </Grid>
            </Grid>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      );
    });

    return (
      <div className={classes.root}>
        {listButton}
      </div>
    );
  };
};

ControlledExpansionPanels.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => {
  return {
    whatDataIsShown: state.mainBooksData.WhatDataIsShown,
    totalHaditsPerBook: state.numberEachBook,
    shownTable: state.currentTable.shownTable,
    leftTab: state.indexTab.leftTab,
    expandKedudukan: state.expandedPanel.expandKedudukan,
    expandTema: state.expandedPanel.expandTema,
    titleForLoad: state.inputComboValue.titleForLoad
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onCurrentShownTable: (table) => dispatch({ type: CURRENTTABLE, currentTable: table }),
    onDetailsHaditsPerBooks: (arrAy) => dispatch({ type: NUMBEREACHBOOKS, arrayOfNumber: arrAy }),
    onExpandingPanel: (arrAy) => dispatch({ type: EXPANDCOLLAPSE, nameOrfalse: arrAy }),
    onTitleForLoadChanged: (teks) => dispatch({ type: TITLEFORLOAD, value: teks }),
    onStoreBookmarkTable: (obj) => dispatch({ type: BOOKMARKTABLE, value: obj })
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(withTheme(ControlledExpansionPanels)));
