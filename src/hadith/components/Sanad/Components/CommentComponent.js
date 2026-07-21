import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Hidden from '@material-ui/core/Hidden';

import { connect } from 'react-redux';

const useStyles = makeStyles(theme => {
  let bgColorCovBar = theme.palette.grey[100], bgColorTable = theme.palette.grey[100];
  if (theme.palette.type === 'dark') {
    bgColorCovBar = '#1D1D1D';
    bgColorTable = '#1D1D1D';
  }
  return ({
    root: {
      width: '100%',
      height: '100%',
      overflowY: 'scroll',
    },
    coverBar: {
      position: 'absolute',
      background: bgColorCovBar,
      height: '100%',
      top: 0,
      right: 0,
      width: 7,
      '-webkit-transition': 'all .5s',
      opacity: 1,
    },
    paper: {
      width: '100%',
      backgroundColor: bgColorTable
    },
    table: {
      Width: 300,
    },
    whiteBgColor: {
      backgroundColor: theme.palette.background.paper
    }
  });
});

const StyledTableCell = withStyles(theme => {
  let bgColor = theme.palette.grey[300], txColor = theme.palette.common.black;
  if (theme.palette.type === 'dark') {
    bgColor = '#161616';
    txColor = undefined;
  }
  return ({
    head: {
      backgroundColor: bgColor,
      color: txColor
    },
  })
})(TableCell);

const StyledCellBody = withStyles(theme => ({
  body: {
    fontSize: 12,
    color: theme.palette.type === 'dark' ? theme.palette.text.secondary : undefined
  },
}))(TableCell);

const CommentComponent = (props) => {
  const classes = useStyles();
  const { scholarComment } = props;

  return (
    <React.Fragment>
      <div className={classes.root}>
        <Paper className={classes.paper}>
          <Table style={{ width: '300px' }} size="small">
            <TableHead>
              <TableRow>
                <StyledTableCell style={{ borderTopLeftRadius: 20 }} align="center">Ulama</StyledTableCell>
                <StyledTableCell style={{ borderTopRightRadius: 20 }} align="center">Komentar</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody className={classes.whiteBgColor}>
              {scholarComment.map((row, idx) => (
                <TableRow key={idx}>
                  <StyledCellBody width="150px" align="center" component="th" scope="row">{row.Ulama}</StyledCellBody>
                  <StyledCellBody width="150px" align="center">{row.Komentar}</StyledCellBody>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      </div>
      <Hidden smDown>
        <div className={classes.coverBar} id='cover-bar'></div>
      </Hidden>
    </React.Fragment>
  );
}

const mapStateToProps = state => {
  return {
    scholarComment: state.showProfile.scholarComment
  };
};

export default connect(mapStateToProps)(CommentComponent);