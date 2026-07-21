import React from 'react';
import classNames from 'classnames';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import PersonIcon from '@material-ui/icons/Person';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import SubdirectoryArrowLeftOutlinedIcon from '@material-ui/icons/SubdirectoryArrowLeftOutlined';
import ArrowDownwardOutlinedIcon from '@material-ui/icons/CallReceivedOutlined';
import LooksOneOutlinedIcon from '@material-ui/icons/LooksOneOutlined';
import FilterTwoOutlinedIcon from '@material-ui/icons/Filter2Outlined';
import FilterThreeOutlinedIcon from '@material-ui/icons/Filter3Outlined';
import MoreHorizIcon from '@material-ui/icons/MoreHorizOutlined';
import FilterNineOutlinedIcon from '@material-ui/icons/Filter9Outlined';
import FilterNinePlusOutlinedIcon from '@material-ui/icons/Filter9PlusOutlined';


const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        width: 'min-content',
        justifyContent: 'center',
        flexWrap: 'wrap',
    },
    wrapEach: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        margin: '0 20px',
        position: 'relative'
    },
    labelChip: {
        color: theme.palette.text.secondary
    },
    multiSanadPos: {
        position: 'absolute'
    },
    backgroundChip: {
        backgroundColor: theme.palette.background.paper
    },
    equalMargin: {
        margin: 'auto'
    },
    topMargin: {
        marginTop: 'auto',
    },
    leftMargin: {
        marginLeft: 20
    },
    iconColor: {
        color: theme.palette.grey['400']
    }
}));

const commonPatern = ['Rasulullah', 'Shahabat', 'Tabi\'in', 'Tabi\'ut Tabi\'in', 'Rawi Lain', 'Penyusun Hadits'];
const chipLabel = {
    'Qudsi': ['Firman Allah', 'Rasulullah', 'Shahabat', 'Tabi\'in', 'Tabi\'ut Tabi\'in', 'Rawi Lain', 'Penyusun Hadits'],
    'Marfu\'': commonPatern,
    'Mauquf': commonPatern,
    'Maqthu\'': commonPatern,
    'Mursal': commonPatern,
    'Mu\'dhal': commonPatern,
    'Munqathi\'': commonPatern,
    'Mu\'allaq': commonPatern,
    'Gharib': commonPatern,
    '\'Aziz': commonPatern,
    'Masyhur': commonPatern,
    'Mutawatir': commonPatern,
};

const ExDiagram = ({ select }) => {
    const classes = useStyles();
    let chipColor, arrowColor, rotateStyle, strightArrow, countSanad, countHint;
    return (
        <div className={classNames(classes.root, classes.equalMargin)}>
            {chipLabel[select].map((text, i) => {
                chipColor = 'primary';
                arrowColor = '#bdbdbd';
                rotateStyle = null;
                strightArrow = null;
                countSanad = [];
                countHint = null

                const setFirstArrow = () => {
                    arrowColor = 'transparent';
                    rotateStyle = { color: '#bdbdbd', transform: 'rotate(-450deg)', marginTop: 10, marginLeft: 'auto', marginRight: '-4px' };
                }

                const setMidleArrow = () => {
                    chipColor = 'default';
                    arrowColor = 'transparent';
                    strightArrow = <ArrowDownwardOutlinedIcon style={{ color: '#bdbdbd', marginLeft: 'auto', marginRight: '-7px', transform: 'rotate(-46deg)' }} />;
                }

                const setRotateStyle = () => {
                    rotateStyle = { color: '#bdbdbd', marginLeft: 'auto' };
                }

                switch (select) {
                    case 'Mauquf':
                        if (i === 0) {
                            chipColor = 'default';
                            arrowColor = 'transparent';
                        }
                        break;
                    case 'Maqthu\'':
                        if (i === 0 || i === 1) {
                            chipColor = 'default';
                            arrowColor = 'transparent';
                        }
                        break;
                    case 'Mursal':
                        switch (i) {
                            case 0:
                                setFirstArrow();
                                break;
                            case 1:
                                setMidleArrow();
                                break;
                            case 2:
                                setRotateStyle();
                                break;
                        }
                        break;
                    case 'Mu\'dhal':
                        switch (i) {
                            case 1:
                                setFirstArrow();
                                break;
                            case 2:
                                setMidleArrow();
                                break;
                            case 3:
                                setMidleArrow();
                                break;
                            case 4:
                                setRotateStyle();
                                break;
                        }
                        break;
                    case 'Munqathi\'':
                        switch (i) {
                            case 1:
                                setFirstArrow();
                                break;
                            case 2:
                                setMidleArrow();
                                break;
                            case 3:
                                setRotateStyle();
                                break;
                        }
                        break;
                    case 'Mu\'allaq':
                        switch (i) {
                            case 3:
                                setFirstArrow();
                                break;
                            case 4:
                                setMidleArrow();
                                break;
                            case 5:
                                setRotateStyle();
                                break;
                        }
                        break;
                    case 'Gharib':
                        if (i === 1) {
                            countHint = <LooksOneOutlinedIcon className={classNames(classes.equalMargin, classes.iconColor)} />;
                        }
                        break;
                    case '\'Aziz':
                        countSanad = [1];
                        if (i === 1) {
                            countHint = <FilterTwoOutlinedIcon className={classNames(classes.iconColor, classes.topMargin, classes.leftMargin)} />;
                        }
                        break;
                    case 'Masyhur':
                        countSanad = [1, 2];
                        if (i === 1) {
                            countHint = (
                                <>
                                    <FilterThreeOutlinedIcon className={classNames(classes.iconColor, classes.topMargin, classes.leftMargin)} />
                                    <MoreHorizIcon className={classNames(classes.iconColor, classes.topMargin)} />
                                    <FilterNineOutlinedIcon className={classNames(classes.iconColor, classes.topMargin)} />
                                </>
                            );
                        }
                        break;
                    case 'Mutawatir':
                        countSanad = [1, 2];
                        if (i === 1) {
                            countHint = (
                                <>
                                    <FilterThreeOutlinedIcon className={classNames(classes.iconColor, classes.topMargin, classes.leftMargin)} />
                                    <MoreHorizIcon className={classNames(classes.iconColor, classes.topMargin)} />
                                    <FilterNinePlusOutlinedIcon className={classNames(classes.iconColor, classes.topMargin)} />
                                </>
                            );
                        }
                        break;
                    default:
                        break;
                }
                return (
                    <div key={text} className={classes.wrapEach}>
                        <div style={{ display: 'flex', flexDirection: 'row' }}>
                            <Chip
                                classes={chipColor === 'default' ? { label: classes.labelChip } : { root: classes.backgroundChip }}
                                avatar={
                                    <Avatar>
                                        {text.includes('Firman') ? 'الله' : <PersonIcon />}
                                    </Avatar>
                                }
                                size='medium'
                                label={text}
                                color={chipColor}
                                variant='outlined'
                            />
                            {text !== 'Rasulullah' ? countSanad.map(num => (
                                <Chip
                                    key={num}
                                    className={classNames(classes.multiSanadPos, classes.backgroundChip)}
                                    style={{ marginTop: (2 * num), marginLeft: (5 * num), zIndex: (-1 * num) }}
                                    avatar={
                                        <Avatar></Avatar>
                                    }
                                    size='medium'
                                    label={text}
                                    color={chipColor}
                                    variant='outlined'
                                />
                            )) : null
                            }
                            {strightArrow}
                            {rotateStyle ? <SubdirectoryArrowLeftOutlinedIcon style={rotateStyle} /> : null}
                            {countHint}
                        </div>
                        {text.includes('Penyusun') ? null : <ArrowDropDownIcon style={{ color: arrowColor, margin: 'auto' }} />}
                    </div>
                );
            })}
        </div>
    );
}

export default React.memo(ExDiagram);