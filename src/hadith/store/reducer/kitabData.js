import * as actionTypes from '../action';

const initialState = {
    Kitab: []
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.KITABDATA:
            // copiedState = JSON.parse(JSON.stringify(state));
            return {
                Kitab: action.kitabData
            };
        case actionTypes.CLEARKITABDATA:
            return {
                Kitab: []
            };
        default:
            return state;
    };
};

export default reducer;