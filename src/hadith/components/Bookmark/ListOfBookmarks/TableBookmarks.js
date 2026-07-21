import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';

import { connect } from 'react-redux';
import CellOfBookmarks from './CellOfBookmarks';
import KitabSimilar from '../../Similar/Components/SubComponent/KitabSimilar';
import getImamName from '../../../fungsi/getImamName';
import getCompleteKitabName from '../../../fungsi/getCompleteKitabName';
import TotalCountBookmark from './TotalCountBookmark';
import arrayOfKitabsName from '../../../store/arrayOfKitabsName';

const useStyles = makeStyles(theme => ({
    // root: {
    //     '& > :first-child': {
    //         margin: 0,
    //         padding: 0,
    //         position: 'relative',
    //         listStyle: 'none',
    //         paddingTop: '8px',
    //         paddingBottom: '8px',
    //         position: 'absolute'
    //     }
    // },
    listSection: {
        backgroundColor: 'inherit'
    },
    ul: {
        padding: 0,
        margin: 0,
        backgroundColor: 'inherit'
    }
}));

const areEqual = (prevProps, nextProps) => {
    if (JSON.stringify(prevProps.tableBookmark) === JSON.stringify(nextProps.tableBookmark)) {
        return true;
    }
    return false;
}

const TableBookmarks = props => {

    const { tableBookmark } = props;
    const classes = useStyles();
    const [open, setOpen] = useState([]);

    const handleExpand = kitabID => () => {
        const convertName = getCompleteKitabName(kitabID);
        setOpen(open => {
            if (open.includes(convertName)) {
                let expand$Kitab = open.filter(kitabName => kitabName !== convertName);
                return expand$Kitab;
            } else {
                return [...open, convertName];
            }
        });
    };
    const keyBookNames = Object.keys(tableBookmark);
    keyBookNames.sort((a, b) => arrayOfKitabsName.indexOf(a) - arrayOfKitabsName.indexOf(b));

    let savedPosition = 0;

    return (
        <List
            component='nav'
            aria-labelledby='table-bookmark-list-subheader'
            subheader={<TotalCountBookmark />}
        >
            {keyBookNames.map((value) => {
                const kitab = getImamName(value);
                tableBookmark[value].sort((a, b) => a - b);
                return (
                    <li key={value} className={classes.listSection}>
                        <ul className={classes.ul}>
                            <KitabSimilar
                                kitab={kitab}
                                count={tableBookmark[value].length}
                                handleCollapse={handleExpand}
                            />
                            {tableBookmark[value].map(number => {
                                savedPosition += 1;
                                return (
                                    <CellOfBookmarks
                                        key={value + number}
                                        index={value + number}
                                        open={open}
                                        listValue={number}
                                        savedBookName={value}
                                        savedPosition={savedPosition}
                                    />
                                );
                            })}
                        </ul>
                    </li>
                );
            })}
        </List>
    );
};

const mapStateToProps = state => {
    return {
        tableBookmark: state.tableOfBookmarks.tableBookmark
    };
};

export default connect(mapStateToProps)(React.memo(TableBookmarks, areEqual));