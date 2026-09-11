import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';

import IconAndLabelLined from '../items/IconAndLabelLined';
import RadioButton from '../items/RadioButton';
import AppSettings from './AppSettings';
import { translationLanguages } from '../../store/translationLanguages';

import { useHistory, useLocation } from "react-router-dom";
import { withTranslation } from 'react-i18next';

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

  return (
    <Drawer open={props.open} onClose={props.clicked(false)}>
      <List className={classes.list}>
        <IconAndLabelLined
          gutter={true}
          icon={null}
          label={props.t('settings.translationLanguage')}
        />
        <List component="div" disablePadding>
          {translationLanguages.map((lang, i) => (
            <ListItem
              button
              className={classes.nested}
              key={lang}
            >
              <RadioButton
                group='translationlang'
                value={lang}
                label={lang}
              />
            </ListItem>
          ))}
        </List>
      </List>
      <Divider />
      <AppSettings />
    </Drawer>
  );
}

export default withTranslation()(OpenSetting);
