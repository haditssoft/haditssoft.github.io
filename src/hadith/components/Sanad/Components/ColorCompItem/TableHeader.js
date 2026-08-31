import React from 'react';
import { withTranslation } from 'react-i18next';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

const useStyles = makeStyles(theme => ({
    addShadow: {
        boxShadow: theme.shadows['4']
    }
}));

const StyledTableCell = withStyles(theme => {
    let bgColor = theme.palette.primary.main, txColor = theme.palette.primary.contrastText;
    if (theme.palette.type === 'dark') {
        bgColor = '#111111';
        txColor = '#00AEDB';
    }
    return ({
    head: {
        backgroundColor: bgColor,
        color: txColor,
        paddingRight: 6,
        '&:last-child': {
            paddingRight: 6,
        },
        borderBottom: 0
    },
})})(TableCell);

function TableHeader(props) {
    const classes = useStyles();
    return (
        <TableHead className={classes.addShadow}>
            <TableRow>
                <StyledTableCell>{props.t('sanad.level')}</StyledTableCell>
                <StyledTableCell>{props.t('sanad.color')}</StyledTableCell>
                <StyledTableCell>{props.t('sanad.description')}</StyledTableCell>
            </TableRow>
        </TableHead>
    );
};

export default withTranslation()(React.memo(TableHeader));