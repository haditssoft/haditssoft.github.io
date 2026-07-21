import React from 'react';
import { withStyles, withTheme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

import ArrowDownward from './ArrowDownward';


const styles = theme => ({
    root: {
        display: 'flex',
        padding: theme.spacing(1, 1),
        minHeight: 60,
    },
    centerText: {
        margin: 'auto',
    },
    reduceMargin: {
        marginRight: 10,
        marginLeft: 10,
    },
    verticalLine: {
        height: 2,
        margin: '7px 0 -8px 0',
        backgroundColor: theme.palette.type === 'dark' ? '#00AEDB' : theme.palette.action.active,
    },
});

class PaperName extends React.Component {

    shouldComponentUpdate(nextProps) {
        if (this.props.theme.palette.type !== nextProps.theme.palette.type) {
            return true;
        }
        if (this.props.rawiName !== nextProps.rawiName) {
            return true;
        };
        return false;
    };

    render() {
        const { classes, item, idx, coloringStyle, clicked, rawiName, visible, lineDirection } = this.props;

        return (
            <React.Fragment>
                {visible !== undefined && lineDirection !== null ? <Divider style={lineDirection} className={classes.verticalLine} /> : null}
                <div className={classes.reduceMargin} style={item === 'A' ? { ...visible, marginTop: '16px' } : { ...visible }} key={item + idx}>
                    {item !== 'A' ? <ArrowDownward /> : null}
                    <Paper
                        className={classes.root}
                        style={coloringStyle}
                        square
                        elevation={2}
                        onClick={clicked ? clicked(item) : null}
                    >
                        <Typography className={classes.centerText} variant="body2">
                            {rawiName}
                        </Typography>
                    </Paper>
                </div>
            </React.Fragment>
        );
    };
};

export default withStyles(styles)(withTheme(PaperName));