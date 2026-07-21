import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import PersonIcon from '@material-ui/icons/Person';

import AvatarAndLabelLined from '../../items/AvatarAndLabelLined';
import Grade from './Items/Grade';

const useStyles = makeStyles(theme => ({
    showScroll: {
        visibility: 'visible',
    },
    divOuter: {
        lineHeight: 2,
        overflowX: 'hidden',
        overflowY: 'scroll',
        textAlign: 'justify',
        visibility: 'hidden',
        flex: '1 1 50%',
        '&:hover': {
            visibility: 'visible'
        },
        '&:focus': {
            visibility: 'visible'
        }
        // [theme.breakpoints.down('xs')]: {
        //     visibility: 'initial',
        // }
    },
    delayedScroll: {
        transition: 'visibility 0.3s',
        '-webkit-transition': 'visibility 0.3s',
        '&:hover': {
            transition: 'visibility 0s 0.3s',
            '-webkit-transition': 'visibility 0s 0.3s'
        }
    },
    researcherFontSize: {
        [theme.breakpoints.down('xs')]: {
            fontSize: '0.8rem',
            fontWeight: 400
        }
    }
}));

const ResearcherAndGrade = ({ researcher, grade, ijma }) => {
    const classes = useStyles();
    return (
        <div className={clsx(classes.divOuter, classes.delayedScroll)}>
            <div className={classes.showScroll}>
                <AvatarAndLabelLined
                    gutter={false}
                    textSet={{
                        className: classes.researcherFontSize,
                        color: 'textSecondary',
                        component: 'p',
                        variant: 'subtitle2',
                        noWrap: true
                    }}
                    icon={<PersonIcon />}
                    label={researcher}
                />
                <Grade grade={grade} ijma={ijma} />
            </div>
        </div>
    );
};

export default React.memo(ResearcherAndGrade);