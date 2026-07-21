import React from 'react';
// import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
// import DeleteIcon from '@material-ui/icons/Delete';

// const useStyles = makeStyles(theme => ({
//     leftIcon: {
//         marginRight: theme.spacing(1),
//         fontSize: 20,
//     }
// }));

const DeleteButton = (props) => {
    // const classes = useStyles();
    return (
        <Button
            variant='text'
            disabled={props.disDelButton}
            color='secondary'
            onClick={props.handleDeleteClicked}
            aria-label="Delete">
            {/* <DeleteIcon className={classes.iconSmall} /> */}
            Delete
        </Button>
    );
}

export default React.memo(DeleteButton);