import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';

import ResearcherAndGrade from '../Component/ResearcherAndGrade';
import GetResearcherName from '../../../fungsi/getResearcherName';

const useStyles = makeStyles({
    root: {
        order: 3,
        minHeight: '1px',
        display: 'flex',
        flexDirection: 'row',
        flex: '1 1 1%',
    },
    verDivider: {
        width: 1,
        height: '95%',
        margin: '4px 0px 4px 0',
        // backgroundColor: 'darkgrey',
    }
});

const GradeContainer = ({ kitabName, firstGrade, secondGrade }) => {
    const classes = useStyles();
    const researcher = GetResearcherName(kitabName);

    return (
        <div className={classes.root}>
            <ResearcherAndGrade researcher={researcher[0]} grade={firstGrade} ijma={researcher[2]} />
            <Divider className={classes.verDivider} />
            <ResearcherAndGrade researcher={researcher[1]} grade={secondGrade} ijma={undefined} />
        </div>
    );
};

export default React.memo(GradeContainer);