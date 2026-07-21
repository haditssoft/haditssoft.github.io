import * as actionTypes from '../../action';

const initialState = {
    searchResult: []
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SEARCHRESULT:
            return {
                searchResult: action.rowsResult
            };
        case actionTypes.CLEARSEARCHRESULT:
            return {
                searchResult: []
            };
        default:
            return state;
    };
};

export default reducer;