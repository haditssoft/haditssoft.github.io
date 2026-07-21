import React from 'react';
import { withTheme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import BtnBook from "./BtnBook";

import sender from '../../sender/senderDataRequest';
import { switchServer, authFetch } from '../../sender/api';
import { CURRENTTABLE, EXPANDCOLLAPSE, TITLEFORLOAD, BOOKMARKTABLE } from '../../store/action';
import { connect } from 'react-redux';
import setOpenedTableName from '../../store/openedTableName';
import { currentSizeId } from '../../store/currentScreenSize';
import { closeDialogTab } from '../../fungsi/closeDialogTab';
import { getCompactImamName } from '../../fungsi/getImamName';

import { withRouter, matchPath } from "react-router";


class Books extends React.Component {

  shouldComponentUpdate(nextProps) {
    if (this.props.theme.palette.type !== nextProps.theme.palette.type) {
      return true;
    }
    return false;
  }

  actualSender = (kitab, lastRead) => {
    sender('loadMainData', [kitab, lastRead]);
    this.props.history.replace('/main/' + getCompactImamName(kitab) + '/' + lastRead);
    // set state current shown table name
    this.props.onCurrentShownTable(kitab);
    // collapse the opened panel in kedudukan or in tema
    if (this.props.expandKedudukan !== false && this.props.expandKedudukan !== null ||
      this.props.expandTema !== false && this.props.expandTema !== null) {
      this.props.onExpandingPanel([false, false]);
    }
    // unselect value selected in bookmark tampilkan combobox
    if (this.props.titleForLoad !== '') {
      this.props.onTitleForLoadChanged('');
      this.props.onStoreBookmarkTable({});
    }
    if (currentSizeId === 'xs') {
      closeDialogTab(false, 'left');
    }
  }

  handleSender = kitab => () => {
    // will be use in senderDataRequest.js for saving lastread
    setOpenedTableName(kitab);
    const token = localStorage.getItem('token');
    if (token) {
      authFetch(switchServer + 'lastRead/' + kitab)
        .then(res => {
          if (res.status === 404) return null;
          if (!res.ok) throw new Error('Failed to fetch lastread');
          return res.json();
        })
        .then(resData => {
          let num = 1;
          if (resData) {
              num = typeof resData === 'number' ? resData : (resData.number || resData.hadith_number || 1);
          }
          this.actualSender(kitab, num.toString());
        })
        .catch(err => {
          console.log('lastread', err);
          this.actualSender(kitab, '1');
        });
    } else {
      this.actualSender(kitab, '1');
    }
  }

  render() {
    return (
      <div style={{ flexGrow: 1 }}>
        <Grid container spacing={3}>
          <Grid item xs={4} sm={6} xl={4}>
            <BtnBook bookName="Shahih Bukhari" clicked={this.handleSender('ShahihBukhari')} />
          </Grid>
          <Grid item xs={4} sm={6} xl={4}>
            <BtnBook bookName="Shahih Muslim" clicked={this.handleSender('ShahihMuslim')} />
          </Grid>
          <Grid item xs={4} sm={6} xl={4}>
            <BtnBook bookName="Sunan Tirmidzi" clicked={this.handleSender('SunanTirmidzi')} />
          </Grid>
          <Grid item xs={4} sm={6} xl={4}>
            <BtnBook bookName="Sunan Abu Daud" clicked={this.handleSender('SunanAbuDaud')} />
          </Grid>
          <Grid item xs={4} sm={6} xl={4}>
            <BtnBook bookName="Sunan Nasa'i" clicked={this.handleSender('SunanNasai')} />
          </Grid>
          <Grid item xs={4} sm={6} xl={4}>
            <BtnBook bookName="Sunan Ibnu Majah" clicked={this.handleSender('SunanIbnuMajah')} />
          </Grid>
          <Grid item xs={4} sm={6} xl={4}>
            <BtnBook bookName="Sunan Darimi" clicked={this.handleSender('SunanDarimi')} />
          </Grid>
          <Grid item xs={4} sm={6} xl={4}>
            <BtnBook bookName="Musnad Ahmad" clicked={this.handleSender('MusnadAhmad')} />
          </Grid>
          <Grid item xs={4} sm={6} xl={4}>
            <BtnBook bookName="Muwatha' Malik" clicked={this.handleSender('MuwathaMalik')} />
          </Grid>
          <Grid item xs={4} sm={6} xl={4}>
            <BtnBook bookName="Sunan Daruquthni" clicked={this.handleSender('SunanDaruquthni')} />
          </Grid>
          <Grid item xs={4} sm={6} xl={4}>
            <BtnBook bookName="Shahih Ibnu Khuzaimah" clicked={this.handleSender('ShahihIbnuKhuzaimah')} />
          </Grid>
          <Grid item xs={4} sm={6} xl={4}>
            <BtnBook bookName="Shahih Ibnu Hibban" clicked={this.handleSender('ShahihIbnuHibban')} />
          </Grid>
          <Grid item xs={4} sm={6} xl={4}>
            <BtnBook bookName="Al Mustadrak" clicked={this.handleSender('AlMustadrak')} />
          </Grid>
          <Grid item xs={4} sm={6} xl={4}>
            <BtnBook bookName="Musnad Syafi'i" clicked={this.handleSender('MusnadSyafii')} />
          </Grid>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    expandKedudukan: state.expandedPanel.expandKedudukan,
    expandTema: state.expandedPanel.expandTema,
    titleForLoad: state.inputComboValue.titleForLoad
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onCurrentShownTable: (table) => dispatch({ type: CURRENTTABLE, currentTable: table }),
    onExpandingPanel: (arrAy) => dispatch({ type: EXPANDCOLLAPSE, nameOrfalse: arrAy }),
    onTitleForLoadChanged: (teks) => dispatch({ type: TITLEFORLOAD, value: teks }),
    onStoreBookmarkTable: (obj) => dispatch({ type: BOOKMARKTABLE, value: obj })
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withTheme(withRouter(Books)));
