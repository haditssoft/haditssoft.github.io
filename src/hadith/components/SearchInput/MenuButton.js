import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

const useStyles = makeStyles(theme => ({
    iconButton: {
        padding: 10,
        },
    ibColor: {
            color: theme.palette.type === 'dark' ? undefined : theme.palette.text.secondary
        }
}));

const MenuButton = props => {
    const classes = useStyles();
    const theme = useTheme();

    const menuIcon = React.useMemo(() => (
        <IconButton
            className={classes.iconButton}
            aria-label="Menu"
            onClick={props.toggleDrawer(true)}
        >
            <MenuIcon className={classes.ibColor} />
        </IconButton>
    ), [theme.palette.type]);
    
    return menuIcon;
}

export default MenuButton;