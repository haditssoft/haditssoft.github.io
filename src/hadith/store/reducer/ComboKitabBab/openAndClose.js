import * as actionTypes from '../../action';

const initialState = {
    openComboKitab: false,
    openComboBab: false
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.OPENCOMBOKITAB:
            return {
                ...state,
                openComboKitab: action.open
            };
        case actionTypes.OPENCOMBOBAB:
            return {
                ...state,
                openComboBab: action.open
            };
        default:
            return state;
    };
};

export default reducer;