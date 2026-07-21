import React from 'react';
import classNames from 'classnames';
import { withStyles, withTheme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import { connect } from 'react-redux';
import ButtonLink from '../../items/ButtonLink';
import CommentComponent from './CommentComponent';
import * as kitabsName from '../../../store/kitabsName';
import sender, { setDispatchTotalHadith } from '../../../sender/senderDataRequest';
import { TOTALROW, NARRATORNAME, TOTALHADITHDATA, CURRENTTABLE } from '../../../store/action';
import { closeDialogTab } from '../../../fungsi/closeDialogTab';
import { currentSizeId } from '../../../store/currentScreenSize';
import { getCompactImamName } from '../../../fungsi/getImamName';
import { withRouter } from 'react-router';

const styles = theme => ({
    containerRawi: {
        height: 'fit-content',
        flexDirection: 'row',
    },
    totalHadith: {
        flexDirection: 'row',
        height: 'fit-content',
    },
    totalHadMargin: {
        margin: '0 30px 0 0',
        height: 'fit-content',
    },
    totalHadHeight: {
        height: 'fit-content',
    },
    itemMargin: {
        marginBottom: 20,
    },
    additionalMargin: {
        marginRight: 24,
    },
    fixedWidthSet: {
        minWidth: '14rem',
    },
    borderDecorPadding: {
        height: 'fit-content',
    },
    scrollbarComment: {
        position: 'relative',
        '&:hover #cover-bar': {
            opacity: 0,
            '-webkit-transition': 'all .5s',
        },
    },
});

const TypographyMod = withStyles(theme => ({
    root: props => {
        switch (props.component) {
            case 'span':
                return ({
                    color: theme.palette.primary.main,
                    // fontWeight: 500
                });
            default:
                return ({
                    color: theme.palette.type === 'dark' ? theme.palette.text.secondary : theme.palette.text.primary
                    //   fontWeight: 500,
                });
        }
    },
}))(Typography);

class ProfileComponent extends React.Component {

    shouldComponentUpdate(nextProps) {
        if (this.props.theme.palette.type !== nextProps.theme.palette.type) {
            return true;
        }
        if (nextProps.rightTab !== this.props.rightTab) {
            return false;
        } else if (!nextProps.openProfile) {
            return false;
        }
        return true;
    }

    componentDidMount() {
        setDispatchTotalHadith(this.propsForTotalHadith);
    }

    propsForTotalHadith = () => {
        return {
            onStoreTotalHadith: this.props.onStoreTotalHadith,
            onDispatchCountRow: this.props.onDispatchCountRow
        };
    }

    handleClicked = (tableName) => () => {
        if (this.props.rightTab === 1) {
            this.props.onStoreNarratorName(this.props.narrators[this.props.sanadPos]['Nama' + this.props.selectedRawi]);
            sender('loadTotalHadith', [tableName, this.props.narrators[this.props.sanadPos]['KodeRawi' + this.props.selectedRawi]]);
        } else {
            this.props.onStoreNarratorName(this.props.narrator[0]['Nama']);
            sender('loadTotalHadith', [tableName, this.props.narrator[0]['KodeRawi']]);
        }
        // set state current shown table name
        this.props.onCurrentShownTable(tableName);
        this.props.history.push(`/main/${getCompactImamName(tableName)}/1`);
        if (currentSizeId === 'xs') {
            this.props.tirggerClose();
            closeDialogTab(false, 'left');
        }
    }

    render() {
        const { classes, sanadPos, rightTab } = this.props;

        let narratorData;
        let a_to_j;
        if (rightTab === 1) {
            narratorData = this.props.narrators[sanadPos];
            a_to_j = this.props.selectedRawi;
        } else {
            narratorData = this.props.narrator[0];
            a_to_j = '';
        }

        let editedKalangan = '';
        if (narratorData['Kalangan' + a_to_j]) {
            if (narratorData['Kalangan' + a_to_j].includes('kalangan')) {
                editedKalangan = narratorData['Kalangan' + a_to_j].replace('kalangan ', '');
            } else if (narratorData['Kalangan' + a_to_j].includes('tdk')) {
                editedKalangan = narratorData['Kalangan' + a_to_j].replace('tdk', 'tak');
            } else {
                editedKalangan = narratorData['Kalangan' + a_to_j];
            }
        }

        return (
            <React.Fragment>
                <TypographyMod variant="h6" style={{ marginBottom: '0.65em' }}>
                    {narratorData['Nama' + a_to_j]}
                </TypographyMod>
                <Grid container className={classes.containerRawi}>
                    <Grid item className={classNames(classes.itemMargin, classes.fixedWidthSet, classes.borderDecorPadding, classes.additionalMargin)}>
                        <TypographyMod variant='caption' display='block'>Kuniyah<TypographyMod variant='caption' component='span'>: {narratorData['Kuniyah' + a_to_j]}</TypographyMod></TypographyMod>
                        <TypographyMod variant='caption' display='block'>Laqob<TypographyMod variant='caption' component='span'>: {narratorData['Laqob' + a_to_j]}</TypographyMod></TypographyMod>
                        <TypographyMod variant='caption' display='block'>Nasab<TypographyMod variant='caption' component='span'>: {narratorData['Nasab' + a_to_j]}</TypographyMod></TypographyMod>
                        <TypographyMod variant='caption' display='block'>Kalangan<TypographyMod variant='caption' component='span'>: {editedKalangan}</TypographyMod></TypographyMod>
                        <TypographyMod variant='caption' display='block'>Negeri Hidup<TypographyMod variant='caption' component='span'>: {narratorData['NegeriHidup' + a_to_j]}</TypographyMod></TypographyMod>
                        <TypographyMod variant='caption' display='block'>Negeri Wafat<TypographyMod variant='caption' component='span'>: {narratorData['NegeriWafat' + a_to_j]}</TypographyMod></TypographyMod>
                        <TypographyMod variant='caption' display='block'>Tahun Wafat<TypographyMod variant='caption' component='span'>: {narratorData['TahunWafat' + a_to_j]}</TypographyMod></TypographyMod>
                    </Grid>
                    <Grid item className={classNames(classes.itemMargin, classes.additionalMargin, classes.scrollbarComment)}>
                        <CommentComponent />
                    </Grid>
                    <Grid item className={classNames(classes.itemMargin, classes.borderDecorPadding)}>
                        <TypographyMod variant='subtitle2' display='block' style={{ marginBottom: '0.35em' }}>Jumlah Hadits:</TypographyMod>
                        <Grid container className={classes.totalHadith}>
                            <Grid item className={classes.totalHadMargin}>
                                <TypographyMod variant='caption' display='block'>Bukhari: <ButtonLink textLabel={narratorData['RBukhari' + a_to_j]} clicked={this.handleClicked(kitabsName.SHAHIHBUKHARI)} /></TypographyMod>
                                <TypographyMod variant='caption' display='block'>Muslim: <ButtonLink textLabel={narratorData['RMuslim' + a_to_j]} clicked={this.handleClicked(kitabsName.SHAHIHMUSLIM)} /></TypographyMod>
                                <TypographyMod variant='caption' display='block'>Tirmidzi: <ButtonLink textLabel={narratorData['RTirmidzi' + a_to_j]} clicked={this.handleClicked(kitabsName.SUNANTIRMIDZI)} /></TypographyMod>
                                <TypographyMod variant='caption' display='block'>Abu Daud: <ButtonLink textLabel={narratorData['RAbuDaud' + a_to_j]} clicked={this.handleClicked(kitabsName.SUNANABUDAUD)} /></TypographyMod>
                                <TypographyMod variant='caption' display='block'>Nasa'i: <ButtonLink textLabel={narratorData['RNasai' + a_to_j]} clicked={this.handleClicked(kitabsName.SUNANNASAI)} /></TypographyMod>
                            </Grid>
                            <Grid item className={classes.totalHadHeight}>
                                <TypographyMod variant='caption' display='block'>Ibnu Majah: <ButtonLink textLabel={narratorData['RIbnuMajah' + a_to_j]} clicked={this.handleClicked(kitabsName.SUNANIBNUMAJAH)} /></TypographyMod>
                                <TypographyMod variant='caption' display='block'>Darimi: <ButtonLink textLabel={narratorData['RDarimi' + a_to_j]} clicked={this.handleClicked(kitabsName.SUNANDARIMI)} /></TypographyMod>
                                <TypographyMod variant='caption' display='block'>Ahmad: <ButtonLink textLabel={narratorData['RAhmad' + a_to_j]} clicked={this.handleClicked(kitabsName.MUSNADAHMAD)} /></TypographyMod>
                                <TypographyMod variant='caption' display='block'>Malik: <ButtonLink textLabel={narratorData['RMalik' + a_to_j]} clicked={this.handleClicked(kitabsName.MUWATHAMALIK)} /></TypographyMod>
                            </Grid>
                        </Grid>

                    </Grid>
                </Grid>
            </React.Fragment>
        );
    };
};

const mapStateToProps = state => {
    return {
        narrators: state.sanadData.narrators,
        sanadPos: state.sanadPosition.sanadPos,
        selectedRawi: state.showProfile.selectedRawi,
        narrator: state.clickedNarrator.narrator,
        rightTab: state.indexTab.rightTab,
        openProfile: state.showProfile.openProfile,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onDispatchCountRow: (rows) => dispatch({ type: TOTALROW, totalRow: rows }),
        onStoreNarratorName: (str) => dispatch({ type: NARRATORNAME, name: str }),
        onStoreTotalHadith: (arRay) => dispatch({ type: TOTALHADITHDATA, value: arRay }),
        onCurrentShownTable: (table) => dispatch({ type: CURRENTTABLE, currentTable: table }),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(withTheme(withRouter(ProfileComponent))));