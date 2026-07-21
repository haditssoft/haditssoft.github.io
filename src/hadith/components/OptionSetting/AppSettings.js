import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import Switch from '@material-ui/core/Switch';
import BrightnessMediumIcon from '@material-ui/icons/BrightnessMedium';

import { connect } from 'react-redux';
import { GLOBALTHEME, LIGHTDARKSWITCH } from '../../store/action';
import { light, dark } from '../../fungsi/getTheme';
import { switchServer, authFetch } from '../../sender/api';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
}));

let countDown, currentTheme;

// will be use in LoginForm.js
export const setCurrentTheme = booLean => {
  currentTheme = booLean;
}

const AppSettings = props => {
  const classes = useStyles();
  const { isDark } = props;

  useEffect(() => {
    if (isDark === currentTheme) { return; }
    if (countDown) { clearTimeout(countDown); }
    
    countDown = setTimeout(() => {
      if (isDark) {
        const getTheme = dark();
        props.onSetGlobalTheme(getTheme);
      } else {
        const getTheme = light();
        props.onSetGlobalTheme(getTheme);
      }
      currentTheme = isDark;
      // save theme setting
      const token = localStorage.getItem('token');
      if (token) {
        const themeId = isDark ? 'd' : 'l';
        authFetch(switchServer + 'theme', {
          method: 'PUT',
          body: JSON.stringify({ theme: themeId })
        })
          .then(res => {
            if (!res.ok) {
              throw new Error('Failed to save theme setting.');
            }
            return res;
          })
          .catch(err => console.log('save theme', err));
      }
    }, 300);
  }, [isDark]);

  const handleToggle = () => {
    props.onSwitchTheme(!isDark);
  };

  return (
    <List subheader={<ListSubheader>Settings</ListSubheader>} className={classes.root}>
      <ListItem>
        <ListItemIcon>
          <BrightnessMediumIcon />
        </ListItemIcon>
        <ListItemText id="switch-list-label-theme" primary="Dark mode" />
        <ListItemSecondaryAction>
          <Switch
            edge="end"
            color='primary'
            onChange={handleToggle}
            checked={!!isDark}
            inputProps={{ 'aria-labelledby': 'switch-list-label-theme' }}
          />
        </ListItemSecondaryAction>
      </ListItem>
    </List>
  );
}

const mapStateToProps = state => {
  return {
    isDark: state.lightDarkSwitch.isDark
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onSetGlobalTheme: (obj) => dispatch({ type: GLOBALTHEME, theme: obj }),
    onSwitchTheme: (booLean) => dispatch({ type: LIGHTDARKSWITCH, dark: booLean })
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(AppSettings));