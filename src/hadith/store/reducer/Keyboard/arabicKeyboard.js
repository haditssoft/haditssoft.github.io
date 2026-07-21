import * as actionTypes from '../../action';

const initialState = {
    anchorEl: null,
    openKeyboard: false
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SHOWARABICKEYBOARD:
            return {
                anchorEl: action.target,
                openKeyboard: action.open
            };
        default:
            return state;
    };
};

export default reducer;