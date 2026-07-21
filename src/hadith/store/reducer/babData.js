import * as actionTypes from '../action';

const initialState = {
    Bab: []
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.BABDATA:
            return {
                Bab: action.babData
            };
        case actionTypes.CLEARBABDATA:
            return {
                Bab: []
            };
        default:
            return state;
    };
};

export default reducer;