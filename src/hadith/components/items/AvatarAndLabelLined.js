import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';

const useStyles = makeStyles(theme => {
  let COLOR = '#707070', BGCOLOR = theme.palette.grey[200], BORDER = null;
  if (theme.palette.type === 'dark') {
    COLOR = '#00AEDB';
    BGCOLOR = '#1D1D1D';
    BORDER = '3px solid #00AEDB';
  }
  return ({
    avatarStyle: {
      margin: '0 10px',
      color: COLOR,
      backgroundColor: BGCOLOR,
      border: BORDER,
      [theme.breakpoints.down('xs')]: {
        margin: 0,
        width: 30,
        height: 30
      }
    },
    displaySet: {
      [theme.breakpoints.down('xs')]: {
        minWidth: 35
      }
    },
    setPadding: {
      [theme.breakpoints.down('xs')]: {
        marginLeft: 3
      }
    }
  });
});

const AvatarAndLabelLined = props => {
  const classes = useStyles();

  return (
    <ListItem disableGutters className={classes.setPadding}>
        <ListItemAvatar className={classes.displaySet}>
            <Avatar className={classes.avatarStyle}>
                {props.icon}
            </Avatar>
        </ListItemAvatar>
        <ListItemText primaryTypographyProps={props.textSet || {}} primary={props.label} />
    </ListItem>
  );
}

export default React.memo(AvatarAndLabelLined);