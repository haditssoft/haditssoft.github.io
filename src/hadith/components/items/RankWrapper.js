import React from 'react';

import iconLabelKedudukan from './IconLabelKedudukan';
import ExpansionPanel from '../ExpansionPanel';
import HadithTermButton from './HadithTermButton';


const RankWrapper = () => (
    <>
        <HadithTermButton />
        <ExpansionPanel iconlabel={iconLabelKedudukan} />
    </>
);

export default React.memo(RankWrapper);