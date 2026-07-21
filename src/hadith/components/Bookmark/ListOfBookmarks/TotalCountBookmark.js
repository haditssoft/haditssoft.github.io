import React from 'react';
// import { makeStyles } from '@material-ui/core/styles';
import ListSubheader from '@material-ui/core/ListSubheader';

import { connect } from 'react-redux';

// const useStyles = makeStyles(theme => ({
//     root: {
//         color: theme.palette.primary.contrastText,
//         backgroundColor: theme.palette.primary.main
//     }
// }));

const TotalCountBookmark = props => {
    // const classes = useStyles();
    return (
        <ListSubheader
            // className={classes.root}
            disableSticky
            component='div'
            id='table-bookmark-list-subheader'
        >
            Total: {props.totalRow}
        </ListSubheader>
    )
};

const mapStateToProps = state => {
    return {
        totalRow: state.mainBooksData.TotalRow,
    }
  }

export default connect(mapStateToProps)(React.memo(TotalCountBookmark));