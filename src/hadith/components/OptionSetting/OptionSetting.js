import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import RadioButtonCheckedIcon from '@material-ui/icons/YoutubeSearchedForOutlined';

import IconAndLabelLined from '../items/IconAndLabelLined';
import RadioButton from '../items/RadioButton';
import AppSettings from './AppSettings';
import { connect } from 'react-redux';
import { RADIOMODECARICHECKED } from '../../store/action';
import { switchServer, authFetch } from '../../sender/api';

import { useHistory, useLocation } from "react-router-dom";

const useStyles = makeStyles(theme => ({
  list: {
    width: 250,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

const OpenSetting = props => {

  const classes = useStyles();

  const history = useHistory();
  const location = useLocation();
  
  useEffect(() => {
    // effect ini tujuannya untuk handle ketika klik tombol back/forward browser
    // yg menyebabkan url berubah, sehingga show/hide drawer perlu trigger manual
    if (location.pathname !== '/setting') {
        props.clicked(false)();
    } else {
      // masuk kesini juga bisa terjadi ketika pertama mengunjungi 
      // url "/setting" dengan mengetikkan di address bar lalu enter
        props.clicked(true)();
    }
  }, [location.pathname]);

  useEffect(() => {
    if (props.open) {      
      if (location.pathname !== '/setting') {
        history.push('/setting', {ref: location.pathname + location.search});
      }
    } else {
      if (location.state) {
        history.replace(location.state.ref);
      } else {
        // masuk sini berarti langsung akses url /setting by typing on address bar
        if (location.pathname === '/setting') {
          history.replace('/');
          history.push('/setting', {ref: '/'});
        }
      }
    }
  }, [props.open]);


  useEffect(() => {
    // dikarenakan ada kondisi ketika user ketik query search manual di address bar lalu press enter
    // pada saat itu ada proses setting mode pencarian untuk sisi UI dan sisi server
    // di file GoogleSearchInput.js dalam fungsi componentDIdMount, oleh karena itu fungsi setting
    // disini jangan dijalankan agar tidak menimpah/override setting yg sdh diterapkan itu
    if (location.pathname !== '/search') {
      const token = localStorage.getItem('token');
      if (token) {
        authFetch(switchServer + 'search-mode')
          .then(res => {
            if (res.status === 404) return null;
            if (!res.ok) throw new Error('Failed to get search mode setting.');
            return res.json();
          })
          .then(resData => {
            let val = resData;
            if (resData && typeof resData === 'object') val = resData.searchMode || resData.search_mode;
            if (val === 0 || val === 1) {
              props.onRadioModeCariChecked(val);
            }
          })
          .catch(err => console.log(err));
      }
    }
  }, []);

  return (
    <Drawer open={props.open} onClose={props.clicked(false)}>
      <List className={classes.list}>
        <IconAndLabelLined
          gutter={false}
          icon={<RadioButtonCheckedIcon />}
          label='Mode cari'
        />
        <List component="div" disablePadding>
          <ListItem
            button
            onClick={props.clicked(false)}
            onKeyDown={props.clicked(false)}
            className={classes.nested}
          >
            <RadioButton
              group='modecari'
              idx={0}
              label='Satu kata kunci'
            />
          </ListItem>
        </List>
        <IconAndLabelLined
          gutter={true}
          icon={null}
          label='Multi kata kunci'
        />
        <List component="div" disablePadding>
          <ListItem
            button
            onClick={props.clicked(false)}
            onKeyDown={props.clicked(false)}
            className={classes.nested}
          >
            <RadioButton
              group='searchendpoint'
              idx={0}
              label='Cari per kitab'
            />
          </ListItem>
          <ListItem
            button
            onClick={props.clicked(false)}
            onKeyDown={props.clicked(false)}
            className={classes.nested}
          >
            <RadioButton
              group='searchendpoint'
              idx={1}
              label='Cari semua kitab'
            />
          </ListItem>
        </List>
      </List>
      <Divider />
      <AppSettings />
    </Drawer>
  );
}

const mapDispatchToProps = dispatch => {
  return {
    onRadioModeCariChecked: (idx) => dispatch({ type: RADIOMODECARICHECKED, checked: idx })
  };
};

export default connect(null, mapDispatchToProps)(OpenSetting);
