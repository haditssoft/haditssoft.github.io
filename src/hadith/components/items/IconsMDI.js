import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Icon from '@mdi/react';
import {
    mdiAccountSearch, mdiAccountCardDetails, mdiAccountHeart, mdiAccountQuestion,
    mdiAccountCheck, mdiAccountSwitch, mdiBookOpenPageVariant, mdiBook,
    mdiTshirtCrew, mdiScaleBalance, mdiFoodForkDrink, mdiKabaddi, mdiPistol, mdiMessageReplyText,
    //   mdiSitemap, mdiSword, mdiSwordCross, mdiBookOpenVariant, mdiFood, mdiGavel, mdiAccountGroup
    mdiTrophyAward, mdiSitemap, mdiFileSearch, mdiBuffer,
    mdiAccountCircle, mdiAccountCircleOutline
} from '@mdi/js';

const styles = {
    customIcon: {
        fill: 'currentColor',
        // width: '1.5rem',
        height: '1.5rem',
        display: 'inline-block',
        fontSize: '24px',
        transition: 'fill 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
        userSelect: 'none',
        flexShrink: 0,
    }
};

// AppBar Icons
export const IconBiografi = withStyles(styles)((props) => {
    const { classes } = props;
    return <Icon className={classes.customIcon} path={mdiAccountCardDetails} size={1} />;
});
export const IconNote = withStyles(styles)((props) => {
    const { classes } = props;
    return <Icon className={classes.customIcon} path={mdiMessageReplyText} size={1} />;
});
// Right Tab
export const IconSearchRawi = withStyles(styles)((props) => {
    const { classes } = props;
    return <Icon className={classes.customIcon} path={mdiAccountSearch} size={1} />;
});
// Left Tab
export const IconSearchResult = withStyles(styles)((props) => {
    const { classes } = props;
    return <Icon className={classes.customIcon} path={mdiFileSearch} size={1} />;
});

export const IconTematis = withStyles(styles)((props) => {
    const { classes } = props;
    return <Icon className={classes.customIcon} path={mdiBuffer} size={1} />;
});
// Tema Icons
export const IconIman = withStyles(styles)((props) => {
    const { classes } = props;
    return <Icon className={classes.customIcon} path={mdiAccountCheck} size={1} />;
});

export const IconIlmu = withStyles(styles)((props) => {
    const { classes } = props;
    return <Icon className={classes.customIcon} path={mdiBookOpenPageVariant} size={1} />;
});

// export const IconUmatDahulu = withStyles(styles)((props) => {
//     const { classes } = props;
//     return <Icon className={classes.customIcon} path={mdiAccountGroup} size={1} />;
// });

export const IconAlQuran = withStyles(styles)((props) => {
    const { classes } = props;
    return <Icon className={classes.customIcon} path={mdiBook} size={1} />;
});

export const IconAkhlaq = withStyles(styles)((props) => {
    const { classes } = props;
    return <Icon className={classes.customIcon} path={mdiAccountHeart} size={1} />;
});

export const IconFood = withStyles(styles)((props) => {
    const { classes } = props;
    return <Icon className={classes.customIcon} path={mdiFoodForkDrink} size={1} />;
});

export const IconPakaian = withStyles(styles)((props) => {
    const { classes } = props;
    return <Icon className={classes.customIcon} path={mdiTshirtCrew} size={1} />;
});

export const IconKepribadian = withStyles(styles)((props) => {
    const { classes } = props;
    return <Icon className={classes.customIcon} path={mdiAccountQuestion} size={1} />;
});

export const IconMuamalah = withStyles(styles)((props) => {
    const { classes } = props;
    return <Icon className={classes.customIcon} path={mdiAccountSwitch} size={1} />;
});

export const IconHukum = withStyles(styles)((props) => {
    const { classes } = props;
    return <Icon className={classes.customIcon} path={mdiScaleBalance} size={1} />;
});

export const IconKriminal = withStyles(styles)((props) => {
    const { classes } = props;
    return <Icon className={classes.customIcon} path={mdiKabaddi} size={1} />;
});

export const IconJihad = withStyles(styles)((props) => {
    const { classes } = props;
    return <Icon className={classes.customIcon} path={mdiPistol} size={1} />;
});

// Kedudukan Icons
export const IconQudsi = withStyles(styles)((props) => {
    const { classes } = props;
    return <Icon className={classes.customIcon} path={mdiTrophyAward} size={1} />;
});
// export const IconMutawatir = withStyles(styles)((props) => {
//     const { classes } = props;
//     return <Icon className={classes.customIcon} path={mdiVectorPolygon} size={1} />;
// });
// export const IconMarfu = withStyles(styles)((props) => {
//     const { classes } = props;
//     return <Icon className={classes.customIcon} path={mdiVectorLine} size={1} />;
// });
// export const IconMauquf = withStyles(styles)((props) => {
//     const { classes } = props;
//     return <Icon className={classes.customIcon} path={mdiVectorPolyline} size={1} />;
// });
// export const IconMaqthu = withStyles(styles)((props) => {
//     const { classes } = props;
//     return <Icon className={classes.customIcon} path={mdiVectorRectangle} size={1} />;
// });
// export const IconMursal = withStyles(styles)((props) => {
//     const { classes } = props;
//     return <Icon className={classes.customIcon} path={mdiVectorSquare} size={1} />;
// });
// export const IconMunqathi = withStyles(styles)((props) => {
//     const { classes } = props;
//     return <Icon className={classes.customIcon} path={mdiVectorTriangle} size={1} />;
// });
// export const IconMuallaq = withStyles(styles)((props) => {
//     const { classes } = props;
//     return <Icon className={classes.customIcon} path={mdiVectorCircle} size={1} />;
// });

// Diagram Sanad Icon
export const IconDiagramSanad = withStyles(styles)((props) => {
    const { classes } = props;
    return <Icon className={classes.customIcon} path={mdiSitemap} size={1} />;
});
// Account Icons
export const IconAccountCircle = withStyles(styles)((props) => {
    const { classes } = props;
    return <Icon className={classes.customIcon} path={mdiAccountCircleOutline} size={1} />;
});
export const IconAccountCheck = withStyles(styles)((props) => {
    const { classes } = props;
    return <Icon className={classes.customIcon} path={mdiAccountCircle} size={1} />;
});
