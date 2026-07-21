import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';

const useStyles = makeStyles(theme => ({
    typographyColor: {
      color: theme.palette.text.secondary
    },
    setPadding: {
        paddingLeft: theme.spacing(3),
        borderTopRightRadius: 20,
        borderBottomRightRadius: 20,
    }
}));

const areAbsolutelyEqual = (prev, next) => {
    if (prev.listText === prev.theState[0]) {
        return false;
    } else if (next.listText === next.theState[0]) {
        return false;
    }
    return true;
};

const ShouldListItemUpdate = React.memo(props => {
    const classes = useStyles();
    return (
        <ListItem
            className={classes.setPadding}
            key={props.listText}
            button
            selected={props.theState[0] === props.listText}
            onClick={() => props.theState[1](props.listText)}
        >
            <ListItemText
                primary={props.listText}
                primaryTypographyProps={{
                    className: classes.typographyColor,
                    variant: 'subtitle2'
                }}
            />
        </ListItem>
    )
}, areAbsolutelyEqual);


const areEqual = (prev, next) => {
    if (prev.list.includes(prev.theState[0])) {
        return false;
    } else if (next.list.includes(next.theState[0])) {
        return false;
    }
    return true;
}

const SideList = props => {
    
    // eslint-disable-next-line
    const subHeader = React.useMemo(() => (
        <ListSubheader disableSticky color='primary' id='total-narrated-list-subheader'>
            {props.head}
        </ListSubheader>
    ), []);

    return (
        <List
            subheader={subHeader}
            dense
            component="nav"
        >
            {props.list.map(text => <ShouldListItemUpdate key={text} theState={props.theState} listText={text} />)}
        </List>
    );
}

export default React.memo(SideList, areEqual);