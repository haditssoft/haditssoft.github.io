import React from 'react';
import { withTheme } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import { IconDiagramSanad } from '../../../items/IconsMDI';
import ColorLensIcons from '@material-ui/icons/ColorLens';

import { connect } from 'react-redux';
import { SHOWDETAILSCOLOR, SHOWDIAGRAMSANAD, DIALOGPROFILERAWI } from '../../../../store/action';
import { isSizeSmall } from '../../../../store/currentScreenSize';

class DiagramAndColor extends React.Component {

    shouldComponentUpdate(nextProps) {
        if (this.props.theme.palette.type !== nextProps.theme.palette.type) {
            return true;
        }
        return false;
    }

    handleDiagramSanad = () => {
        this.props.onShowDiagramSanad(true);
    };

    handleDetailsColor = () => {
        if (isSizeSmall) {
            this.props.onShowDialogProfileRawi('detailsColor');
        } else {
            this.props.onShowDetailsColor(!this.props.openDetailsColor);            
        }
    };

    render() {
        return (
            <React.Fragment>
                <IconButton
                    size='small'
                    onClick={this.handleDiagramSanad}
                >
                    <IconDiagramSanad />
                </IconButton>
                <IconButton
                    size='small'
                    onClick={this.handleDetailsColor}
                >
                    <ColorLensIcons />
                </IconButton>
            </React.Fragment>
        );
    }
};

const mapStateToProps = state => {
    return {
        openDetailsColor: state.showDetailsColor.openDetailsColor,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onShowDiagramSanad: (booLean) => dispatch({ type: SHOWDIAGRAMSANAD, open: booLean }),
        onShowDetailsColor: (booLean) => dispatch({ type: SHOWDETAILSCOLOR, open: booLean }),
        onShowDialogProfileRawi: (str) => dispatch({ type: DIALOGPROFILERAWI, show: str })
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withTheme(DiagramAndColor));