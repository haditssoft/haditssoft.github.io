import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';

import BackIcon from './SubComponent/BackIcon';

const useStyles = makeStyles({
    root: {
      paddingTop: 0,
      paddingBottom: 0,
    },
    alignText: {
        textAlign: 'right',
    },
    customPadding: {
        paddingRight: 20,
        paddingLeft: 10,
        borderLeft: 'dotted grey',
    }
});

const HeaderSimilar = (props) => {
    const classes = useStyles();

    return (
        <ListSubheader disableGutters disableSticky component='div' id='similar-list-subheader'>
            <List disablePadding component='nav'>
                <ListItem disableGutters className={classes.root}>
                    <BackIcon />
                    <ListItemText
                        className={classes.alignText}
                        primaryTypographyProps={{
                            variant: 'subtitle2',
                            className: classes.customPadding
                        }}
                        primary={'Total: ' + props.totalSimilar}
                    />
                </ListItem>
            </List>
        </ListSubheader>
    );
};

export default React.memo(HeaderSimilar);