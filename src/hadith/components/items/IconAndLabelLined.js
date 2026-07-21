import React from 'react';
import { withTheme } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

class IconAndLabelLined extends React.Component {

  shouldComponentUpdate(nextProps) {
    if (this.props.theme.palette.type !== nextProps.theme.palette.type) {
      return true;
    }
    if (this.props.label !== nextProps.label) {
      return true;
    }
    return false;
  }

  render () {
    const { label, icon, gutter, setColor } = this.props;
    
    return (
      <ListItem disableGutters={gutter}>
        <ListItemIcon style={label == 'Mode cari' ? { minWidth: 35 } : null}>
          {icon}
        </ListItemIcon>
        <ListItemText
          primaryTypographyProps={setColor || null}
          primary={label} />
      </ListItem>
    );
  }
}

export default withTheme(IconAndLabelLined);
