import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';

import { withTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { CONTENTINFO } from '../../store/action';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    // maxWidth: 360,
    margin: 'auto 0', // responsible for vertically justify
    // backgroundColor: theme.palette.background.paper,
  },
  typographyColor: {
    color: theme.palette.primary.contrastText
  }
}));

const SideMenuList = props => {
  const classes = useStyles();
  const { contentInfo } = props;

  const handleListItemClick = (index) => {
    props.onDisplayInfoContent(index);
  };

  return (
    <div className={classes.root}>
      <List component="nav">
        <ListItem
            button
            selected={contentInfo === 0}
            onClick={() => handleListItemClick(0)}
          >
        <ListItemText primary={props.t('info.preface')}
          primaryTypographyProps={{ variant: 'body2', className: classes.typographyColor }} />
        </ListItem>
      </List>
      <Divider />
      <List component='nav'>
        <ListItem
          button
          selected={contentInfo === 1}
          onClick={() => handleListItemClick(1)}
        >
          <ListItemText primary={props.t('info.definition')}
            primaryTypographyProps={{ variant: 'body2', className: classes.typographyColor }} />
        </ListItem>
        <ListItem
          button
          selected={contentInfo === 2}
          onClick={() => handleListItemClick(2)}
        >
          <ListItemText primary={props.t('info.narrationWay')}
            primaryTypographyProps={{ variant: 'body2', className: classes.typographyColor }} />
        </ListItem>
        <ListItem
          button
          selected={contentInfo === 3}
          onClick={() => handleListItemClick(3)}
        >
          <ListItemText primary={props.t('info.toWhom')}
            primaryTypographyProps={{ variant: 'body2', className: classes.typographyColor }} />
        </ListItem>
        <ListItem
          button
          selected={contentInfo === 4}
          onClick={() => handleListItemClick(4)}
        >
          <ListItemText primary={props.t('info.strongWeak')}
            primaryTypographyProps={{ variant: 'body2', className: classes.typographyColor }} />
        </ListItem>
        <ListItem
          button
          selected={contentInfo === 5}
          onClick={() => handleListItemClick(5)}
        >
          <ListItemText primary={props.t('info.invalidChain')}
            primaryTypographyProps={{ variant: 'body2', className: classes.typographyColor }} />
        </ListItem>
        <ListItem
          button
          selected={contentInfo === 6}
          onClick={() => handleListItemClick(6)}
        >
          <ListItemText primary={props.t('info.suspicionFlaw')}
            primaryTypographyProps={{ variant: 'body2', className: classes.typographyColor }} />
        </ListItem>
        <ListItem
          button
          selected={contentInfo === 7}
          onClick={() => handleListItemClick(7)}
        >
          <ListItemText primary={props.t('info.jarhTadil')}
            primaryTypographyProps={{ variant: 'body2', className: classes.typographyColor }} />
        </ListItem>
      </List>
      <Divider />
      <List component="nav">
          <ListItem
              button
              selected={contentInfo === 8}
              onClick={() => handleListItemClick(8)}
          >
          <ListItemText primary={props.t('info.standardBook')}
            primaryTypographyProps={{ variant: 'body2', className: classes.typographyColor }} />
          </ListItem>
      </List>
    </div>
  );
}

const mapStateToProps = state => {
    return {
      contentInfo: state.info.contentInfo
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onDisplayInfoContent: (idx) => dispatch({ type: CONTENTINFO, value: idx })
    };
};

export default withTranslation()(connect(mapStateToProps, mapDispatchToProps)(React.memo(SideMenuList)));
