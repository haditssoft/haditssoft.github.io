import * as actionTypes from '../../action';

const initialState = {
    selectionStartIndex: 0,
    selectionEndIndex: 0
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SELECTIONINDEX:
            return {
                selectionStartIndex: action.startValue,
                selectionEndIndex: action.endValue
            };
        default:
            return state;
    };
};

export default reducer;