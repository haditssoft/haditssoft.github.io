import React from 'react';
import { withStyles, withTheme } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DescriptionOutlinedIcon from '@material-ui/icons/DescriptionOutlined';

import { connect } from 'react-redux';
import getCompleteKitabName from '../../../../../fungsi/getCompleteKitabName';
import sender from '../../../../../sender/senderDataRequest';
import { closeDialogTab } from '../../../../../fungsi/closeDialogTab';
import { currentSizeId } from '../../../../../store/currentScreenSize';
import { getCompactImamName } from '../../../../../fungsi/getImamName';
import { withRouter } from 'react-router';
import {
    SIMILARDATA,
    TOTALROW,
    SELECTEDSIMILAR,
    MAINBOOKSDATA,
    CLASSIFICATIONDATA,
    BOOKMARKDATA,
    SEARCHDATA,
    TOTALHADITHDATA,
    HADITHBEFORESIMILAR,
} from '../../../../../store/action';

const styles = theme => ({
    nested: {
        paddingLeft: theme.spacing(4),
    },
});


class NumberSimilarItem extends React.Component {

    shouldComponentUpdate(nextProps) {
        if (this.props.theme.palette.type !== nextProps.theme.palette.type) {
            return true;
        }
        if ((this.props.kitab + this.props.num) === this.props.selectedSimilar) {
            return true;
        } else if ((this.props.kitab + this.props.num) === nextProps.selectedSimilar) {
            return true;
        } else if ((this.props.kitab + this.props.num) !== (nextProps.kitab + nextProps.num)) {
            return true;
        };
        return false;
    };

    handleClick = (kitab, number) => {
        if (this.props.whatDataIsShown !== SIMILARDATA) {
            // prepare for back from similar
            switch (this.props.whatDataIsShown) {
                case MAINBOOKSDATA:
                    this.props.onStoreHadithBeforeSimilar([this.props.shownTable, this.props.position], MAINBOOKSDATA);
                    break;
                case CLASSIFICATIONDATA:
                    this.props.onStoreHadithBeforeSimilar(this.props.shownTable, CLASSIFICATIONDATA);
                    break;
                case BOOKMARKDATA:
                    this.props.onStoreHadithBeforeSimilar([this.props.shownTable, this.props.position], BOOKMARKDATA);
                    break;
                case SEARCHDATA:
                    this.props.onStoreHadithBeforeSimilar(this.props.position, SEARCHDATA);
                    break;
                case TOTALHADITHDATA:
                    this.props.onStoreHadithBeforeSimilar([
                        this.props.shownTable,
                        this.props.totalNarrated[+this.props.position - 1].NoHdt,
                        this.props.position,
                        this.props.totalNarrated.length
                    ], TOTALHADITHDATA);
                    break;
                default:
                    break;
            }
        }
        const pos = this.props.similarData.findIndex(obj => obj.Nama === kitab && obj.NoBanding === number) + 1;
        const completeKitabName = getCompleteKitabName(kitab);
        sender('loadCustomData', [completeKitabName, number, pos, SIMILARDATA]);
        this.props.onDispatchCountRow(this.props.similarData.length);
        this.props.onSelectSimilar(kitab + number);
        this.props.history.push(`/main/${getCompactImamName(completeKitabName)}/${number}`);
        if (currentSizeId === 'xs') {
            closeDialogTab(false, 'left');
        }
    };

    render() {
        const { classes, index, selectedSimilar, kitab, num } = this.props;

        return (
            <ListItem
                key={index}
                selected={selectedSimilar === kitab + num}
                divider
                button
                onClick={() => this.handleClick(kitab, num)}
                className={classes.nested}
            >
                <ListItemIcon>
                    <DescriptionOutlinedIcon />
                </ListItemIcon>
                <ListItemText
                    primaryTypographyProps={{ color: 'textPrimary' }}
                    primary={num} />
            </ListItem>
        );
    };
};

const mapStateToProps = state => {
    return {
        similarData: state.similar.similarData,
        selectedSimilar: state.similar.selectedSimilar,
        whatDataIsShown: state.mainBooksData.WhatDataIsShown,
        shownTable: state.currentTable.shownTable,
        position: state.mainBooksData.Position,
        totalNarrated: state.totalHadith.totalNarrated,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onDispatchCountRow: (rows) => dispatch({ type: TOTALROW, totalRow: rows }),
        onSelectSimilar: (str) => dispatch({ type: SELECTEDSIMILAR, select: str }),
        onStoreHadithBeforeSimilar: (value, str) => dispatch({ type: HADITHBEFORESIMILAR, hadith: value, data: str }),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(withTheme(withRouter(NumberSimilarItem))));