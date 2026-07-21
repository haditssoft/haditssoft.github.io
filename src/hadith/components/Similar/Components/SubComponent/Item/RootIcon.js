import React from 'react';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import BookIcon from '@material-ui/icons/Book';

const RootIcon = () => {
    return <ListItemIcon><BookIcon /></ListItemIcon>;
};

export default React.memo(RootIcon, () => true);