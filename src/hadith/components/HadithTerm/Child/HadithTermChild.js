import React, { useMemo } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';
import FilterVintageOutlinedIcon from '@material-ui/icons/FilterVintageOutlined';

import ButtonSideList from './Item/ButtonSideList';
import ExDiagram from './Item/ExDiagram';

const useStyles = makeStyles(theme => ({
    root: {
        top: 0,
        userSelect: 'none',
        position: 'sticky',
        zIndex: 1,
        backgroundColor: theme.palette.type === 'dark' ? '#1D1D1D' : theme.palette.background.paper
    },
    setDirectionRow: {
        width: '100%',
        height: '100%',
        boxSizing: 'border-box',
    },
    setToFlex: {
        width: '70%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
    },
    setMenuListWidth: {
        width: '30%',
        height: '100%',
        display: 'flex', // responsible for vertically justify of SideMenuList
        overflowY: 'auto',
        borderRight: `1px solid ${theme.palette.divider}`
        // backgroundColor: 'dodgerblue',
    },
    justifyText: {
        position: 'relative',
        padding: theme.spacing(2, 2.5, 2, 7),
        marginTop: 32,
        textAlign: 'justify',
        boxShadow: theme.shadows[2],
        backgroundColor: theme.palette.type === 'dark' ? '#1D1D1D' : theme.palette.grey['100']
    },
    dialogContent: {
        overflowY: 'scroll',
        paddingBottom: 52
    },
    iconColor: {
        position: 'absolute',
        left: 15,
        color: theme.palette.primary.main
    },
    hideScroll: {
        overflow: 'auto'
    },
    setPosition: {
        width: 'calc(70% - 21px)',
        position: 'absolute',
        bottom: 0,
        alignSelf: 'flex-end',
        backgroundColor: theme.palette.type === 'dark' ? '#1D1D1D' : theme.palette.background.paper
    }
}));

const explanationText = {
    'Qudsi': "Secara bahasa kata Qudsi dinisbahkan kepada kata Al-Quds (Suci). Artinya, hadits yang dinisbahkan kepada Dzat yang Maha suci, yaitu Allah Ta'ala. Dan secara istilah (terminologis) definisinya adalah: Sesuatu (hadits) yang dinukil dari Nabi Shallallahu 'alaihi Wa Sallam yang disandarkan oleh beliau kepada Rabb-nya.",
    'Marfu\'': "Marfu' ialah sabda atau perbuatan, taqrir atau sifat yang disandarkan kepada Rasulullah Shallallahu 'alaihi wa sallam.",
    'Mauquf': "Mauquf ialah perkataan, perbuatan atau taqrir yang disandarkan kepada seorang sahabat.",
    'Maqthu\'': "Maqthu' ialah perkataan atau taqrir yang disandarkan kepada tabi'in atau generasi berikutnya.",
    'Mursal': "Mursal ialah hadits yang diriwayatkan oleh seorang perawi langsung disandarkan kepada Nabi shallallahu 'alaihi wa sallam, tanpa menyebutkan nama orang (sahabat) yang menceritakan kepadanya.",
    'Mu\'dhal': "Mu'dhal ialah hadits/berita yang dua orang perawi atau lebih gugur/putus dalam satu tempat secara berurutan.",
    'Munqathi\'': "Munqathi' ialah hadits/berita yang di tengah sanadnya gugur/terputus seorang rawi atau beberapa rawi, tetapi tidak berturut-turut.",
    'Mu\'allaq': "Mu'allaq ialah hadits yang dari awal sanadnya gugur/terputus seorang perawi atau lebih dengan berturut-turut.",
    'Gharib': "Gharib ialah hadits yang diriwayatkan hanya dengan satu sanad.",
    '\'Aziz': "'Aziz ialah hadits yang diriwayatkan dua jalan saja.",
    'Masyhur': "Masyhur ialah hadits yang diriwayatkan lebih dari dua jalan, dan belum mencapai derajat mutawatir.",
    'Mutawatir': "Mutawatir ialah hadits yang diriwayatkan dengan banyak sanad yang berlainan perawinya, dan mustahil mereka bisa berkumpul untuk berdusta membuat hadits itu."
};

const HadithTermChild = props => {

    const classes = useStyles();
    const [select, setSelect] = React.useState('');

    const handleClose = () => {
        props.open(false);        
    };

    const dialogTitle = useMemo(() => (
        <DialogTitle
            classes={{ root: classes.root }}
            id='draggable-hadithterm-dialog'
            onMouseDown={e => e.preventDefault()}
        >
            Terminologi Ilmu Hadits
        </DialogTitle>
    ), []);

    const dialogAction = useMemo(() => (
        <DialogActions className={classes.setPosition}>
            <Button onClick={handleClose} color='primary'>
                Close
            </Button>
        </DialogActions>
    ), []);

    return (
        <>
            <Grid className={classes.hideScroll} container direction='row'>
                <Grid item className={classes.setMenuListWidth}>
                    <ButtonSideList select={select} setSelect={setSelect} />
                </Grid>
                <Grid item className={classes.setToFlex}>
                    {dialogTitle}
                    <DialogContent className={classes.dialogContent}>
                        {select ? <>
                        <ExDiagram select={select} />
                        <DialogContentText variant='subtitle2' className={classes.justifyText}>
                            <FilterVintageOutlinedIcon className={classes.iconColor} />
                            {explanationText[select]}
                        </DialogContentText>
                        </> : null}
                    </DialogContent>
                    {dialogAction}
                </Grid>
            </Grid>
        </>
    );
}

export default React.memo(HadithTermChild);