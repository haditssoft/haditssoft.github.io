import React from 'react';
import { withTheme } from '@material-ui/core/styles';

import NavBar from '../Components/NavBar';
import RawiName from '../Components/RawiName';
import { connect } from 'react-redux';
import { setDispatchSanadHadith } from '../../../sender/senderDataRequest';
import { SANADDATA, SHOWSANAD, SANADPOSITION } from '../../../store/action';


class SanadElement extends React.Component {

    shouldComponentUpdate(nextProps) {
        if (this.props.theme.palette.type !== nextProps.theme.palette.type) {
            return true;
        }
        if (this.props.showSanad !== nextProps.showSanad) {
            return true;
        }
        return false;
    }

    componentDidMount() {
        setDispatchSanadHadith(this.propsForSanadHadith);
    }

    propsForSanadHadith = () => {
        return {
            sanadPos: this.props.sanadPos,
            onChangeSanadPos: this.props.onChangeSanadPos,
            onStoreSanadData: this.props.onStoreSanadData,
            showSanad: this.props.showSanad,
            onShowSanad: this.props.onShowSanad
        };
    }

    render() {
        const { showSanad } = this.props;

        let componentSanad = null;
        if (showSanad === true) {
            componentSanad = (
                <React.Fragment>
                    <NavBar />
                    <RawiName />
                </React.Fragment>
            );
        }

        return componentSanad;
    };
};

const mapStateToProps = state => {
    return {
        showSanad: state.displaySanad.showSanad,
        sanadPos: state.sanadPosition.sanadPos,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onStoreSanadData: (arRay) => dispatch({ type: SANADDATA, data: arRay }),
        onShowSanad: (booLean) => dispatch({ type: SHOWSANAD, show: booLean }),
        onChangeSanadPos: (num) => dispatch({ type: SANADPOSITION, pos: num })
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withTheme(SanadElement));