import React from 'react';
import { withTheme } from '@material-ui/core/styles';

import { connect } from 'react-redux';
import PaperName from './RawiNameItem/PaperName';
import getBgColorRawi from '../../../fungsi/getBgColorRawi';
import { SHOWPROFILE, SELECTEDRAWI, DIALOGPROFILERAWI } from '../../../store/action';
import sender from '../../../sender/senderDataRequest';
import { isSizeSmall } from '../../../store/currentScreenSize';


class RawiName extends React.Component {

    shouldComponentUpdate(nextProps) {
        if (this.props.theme.palette.type !== nextProps.theme.palette.type) {
            return true;
        }
        if (this.props.openProfile !== nextProps.openProfile) {
            return false;
        } else if (this.props.selectedRawi !== nextProps.selectedRawi) {
            return false;
        }
        return true;
    };

    handleClick = (itemClicked) => () => {
        if (this.props.openProfile && this.props.selectedRawi === itemClicked) {
            this.props.onShowProfile(false);
        } else {
            sender('loadScholarComment', [this.props.narrators[this.props.sanadPos]['KodeRawi' + itemClicked]]);
            this.props.onSelectRawi(itemClicked);
            if (isSizeSmall) {
                this.props.onShowDialogProfileRawi('profileRawi');
            } else {
                if (!this.props.openProfile) this.props.onShowProfile(true);
            }
        }
    };

    render () {
        const { narrators, sanadPos } = this.props;
        
        const listOfRawi = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'].map((item, idx) => {
            if (narrators[sanadPos]['Nama' + item] !== null) {
                const BgColor = getBgColorRawi(narrators[sanadPos]['Quality' + item]);
                let coloringStyle = { backgroundColor: typeof BgColor !== 'string' ? BgColor[500] : BgColor };
                if (true) {
                    coloringStyle = {
                        borderRight: 'solid',
                        // borderLeft: 'solid',
                        borderRightWidth: 6,
                        borderColor: typeof BgColor !== 'string' ? BgColor[500] : BgColor,
                        cursor: 'pointer',
                    };
                }
                
                return (
                    <PaperName
                        key={item + idx}
                        rawiName={narrators[sanadPos]['Nama' + item]}
                        coloringStyle={coloringStyle}
                        clicked={this.handleClick}
                        item={item}
                        idx={idx} />
                );
            };
        });
        
        return listOfRawi;
    };
};

const mapStateToProps = state => {
    return {
        narrators: state.sanadData.narrators,
        sanadPos: state.sanadPosition.sanadPos,
        openProfile: state.showProfile.openProfile,
        selectedRawi: state.showProfile.selectedRawi,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onShowProfile: (booLean) => dispatch({ type: SHOWPROFILE, open: booLean }),
        onSelectRawi: (A_to_J) => dispatch({ type: SELECTEDRAWI, selected: A_to_J }),
        onShowDialogProfileRawi: (str) => dispatch({ type: DIALOGPROFILERAWI, show: str })
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withTheme(RawiName));
