import React from 'react';
import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';

import ProfileComponent from './ProfileComponent';
import ColorComponent from './ColorComponent';

let contentOfDialog;

const DialogProfileRawiChild = props => {

    switch (props.ariaLabel) {
        case 'dialog-profile-rawi':
            contentOfDialog = <ProfileComponent tirggerClose={props.tirggerClose} />;
            break;
        case 'dialog-details-color':
            contentOfDialog = <ColorComponent narrator={props.narrators} sanadPosition={props.sanadPos} />;
            break;
        default:
            contentOfDialog = null;
            break;
    }

    return (
        <>
            <DialogContent id={props.ariaLabel}>
                {contentOfDialog}
            </DialogContent>
            <DialogActions>
                <Button onClick={props.tirggerClose} color="primary" autoFocus>
                    Close
                </Button>
            </DialogActions>
        </>
    );
}

export default DialogProfileRawiChild;