import * as actionTypes from "../action";

const initialState = {
    firstPrev: true,
    lastNext: true
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.DISABLEFIRSTPREV:
            return {
                ...state,
                firstPrev: action.disable
            };
        case actionTypes.DISABLELASTNEXT:
            return {
                ...state,
                lastNext: action.disable
            };
        default:
            return state;
    };
};

export default reducer;