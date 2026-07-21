import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import NumberSimilar from './SubComponent/NumberSimilar';
import KitabSimilar from './SubComponent/KitabSimilar';

const useStyles = makeStyles({    
    listSection: {
        backgroundColor: 'inherit'
    },
    ul: {
        padding: 0,
        margin: 0,
        backgroundColor: 'inherit'
    },
});

const initialExpand = [
    // 'Bukhari',
    // 'Muslim',
    // 'Tirmidzi',
    // 'Abu Daud',
    // 'Nasa\'i',
    // 'Ibnu Majah',
    // 'Darimi',
    // 'Ahmad',
    // 'Malik',
];

const KitabAndSubNumber = ({ similarData }) => {
    const classes = useStyles();
    const [open, setOpen] = useState(initialExpand);

    const handleCollapse = collapsedKitab => () => {
        setOpen(open => {
            if (open.includes(collapsedKitab)) {
                let collapseAKitab = open.filter(kitabName => kitabName !== collapsedKitab);
                return collapseAKitab;
            } else {
                return [...open, collapsedKitab];
            };
        });
    };

    // example: {Bukhari: [{Nama: "Bukhari", NoBanding: 52}, {Nama: "Bukhari", NoBanding: 6195}], Muslim: Array(1)}
    let totalEachKitab = {};
    for (let i = 0, n = similarData.length; i < n; i++) {
        const obj = similarData[i];
        totalEachKitab[obj.Nama] = [...totalEachKitab[obj.Nama] || [], obj.NoBanding];
    }

    const keyBookNames = Object.keys(totalEachKitab);

    const kitabAndSub = keyBookNames.map(kitab => (
        <li key={kitab} className={classes.listSection}>
            <ul className={classes.ul}>
                <KitabSimilar kitab={kitab} count={totalEachKitab[kitab].length} handleCollapse={handleCollapse} />
                <NumberSimilar totalEachKitab={totalEachKitab} kitab={kitab} open={open} />
            </ul>
        </li>
    ));
    
    return kitabAndSub;
};

export default React.memo(KitabAndSubNumber);