import React from 'react';
import { withTheme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

import { connect } from 'react-redux';

class SanadCounter extends React.Component {

    shouldComponentUpdate(nextProps) {
        if (this.props.theme.palette.type !== nextProps.theme.palette.type) {
            return true;
        }
        if (nextProps.narrators.length !== this.props.narrators.length) {
            return true;
        } else if (nextProps.sanadPos !== this.props.sanadPos) {
            return true;
        };
        return false;
    };

    render() {
        const { sanadPos, narrators } = this.props;

        return (
            <Typography variant='caption' display='inline' color='initial' noWrap>
                {sanadPos + 1} of {narrators.length}
            </Typography>
        );
    };
};

const mapStateToProps = state => {
    return {
        narrators: state.sanadData.narrators,
        sanadPos: state.sanadPosition.sanadPos,
    };
};

export default connect(mapStateToProps)(withTheme(SanadCounter));