import React from 'react';
import IconButton from '@material-ui/core/IconButton';

const PrevNextSanad = (props) => {
    const { isDisabled, clicked, icon } = props;
    
    return (
        <IconButton
            disabled={isDisabled}
            onClick={clicked}
            size='small'
        >
            {icon}
        </IconButton>
    );
};

export default React.memo(PrevNextSanad, () => true);