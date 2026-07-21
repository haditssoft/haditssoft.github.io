import React from 'react';
// import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
// import SaveIcon from '@material-ui/icons/Save';

// const useStyles = makeStyles(theme => ({
//     leftIcon: {
//         marginRight: theme.spacing(1),
//         fontSize: 20,
//     }
// }));

const SaveButton = (props) => {
    // const classes = useStyles();
    return (
        <Button
            variant='text'
            color='primary'
            // size='small'
            onClick={props.handleSaveClicked}
            disabled={props.disSaveButton}
        >
            {/* <SaveIcon className={classes.iconSmall} /> */}
            Save
        </Button>
    );
}

export default React.memo(SaveButton);