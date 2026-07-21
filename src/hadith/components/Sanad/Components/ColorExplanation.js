import React from 'react';
import { withStyles, withTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import { connect } from 'react-redux';

const styles = theme => ({
    body: {
        height: 88,
        overflowY: 'auto',
        marginTop: '0.35em',
        backgroundColor: theme.palette.type === 'dark' ? '#111111' : theme.palette.grey[300],
    },
});

class ColorExplanation extends React.Component {

    shouldComponentUpdate(nextProps) {
        if (this.props.theme.palette.type !== nextProps.theme.palette.type) {
            return true;
        }
        if (this.props.explanationColor !== nextProps.explanationColor) {
            return true;
        };
        return false;
    };

    render() {
        const { classes, explanationColor } = this.props;
        return (
            <Typography component='div' className={classes.body} gutterBottom>
                <Box fontWeight='fontWeightRegular' fontSize={12} textAlign='justify' fontStyle='oblique' m={1}>
                    {explanationColor}
                </Box>
            </Typography>
        );
    };
};

const mapStateToProps = state => {
    return {
        explanationColor: state.showDetailsColor.explanationColor,
    };
};

export default connect(mapStateToProps)(withStyles(styles)(withTheme(ColorExplanation)));