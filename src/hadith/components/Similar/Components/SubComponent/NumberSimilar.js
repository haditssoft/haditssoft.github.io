import React from 'react';
import List from '@material-ui/core/List';
import Collapse from '@material-ui/core/Collapse';

import NumberSimilarItem from './Item/NumberSimilarItem';

const NumberSimilar = props => {
    
    const { totalEachKitab, kitab, open } = props;

    return (
        <Collapse in={open.includes(kitab)} timeout="auto" mountOnEnter unmountOnExit>
            <List dense component="div" disablePadding>
                {totalEachKitab[kitab].map((num, index) => (
                <NumberSimilarItem
                    key={index}
                    index={index}
                    kitab={kitab}
                    num={num}
                />
                ))}
            </List>
        </Collapse>
    );
};

export default React.memo(NumberSimilar);