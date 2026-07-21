import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import RootIcon from './Item/RootIcon';
import RootBook from './Item/RootBook';
import HadithCount from '../../../SearchResult/HadithCount';

const useStyles = makeStyles(theme => ({
    root: {
        top: 0,
        zIndex: 1,
        position: 'sticky',
        backgroundColor: theme.palette.background.paper,
        // boxShadow: theme.shadows[24]
    }
}));

const areEqual = (prev, next) => {
    if (prev.kitab !== next.kitab) {
        return false; // means render
    } else if (prev.count !== next.count) {
        return false; // means render
    } else if (!Object.is(prev.handleCollapse, next.handleCollapse)) {
        return true; // means do not render
    }
    return false;
}

const KitabSimilar = props => {
    const classes = useStyles();
    const { kitab, count, handleCollapse } = props;

    return (
        <ListItem className={classes.root} button onClick={handleCollapse(kitab)}>
            <RootIcon />
            <ListItemText
                primaryTypographyProps={{ color: 'textPrimary' }}
                primary={
                <React.Fragment>
                    <RootBook book={kitab} />
                    <HadithCount label={count} />
                    {/* {'(' + count + ')'} */}
                </React.Fragment>
            } />
        </ListItem>
    );
};

export default React.memo(KitabSimilar, areEqual);