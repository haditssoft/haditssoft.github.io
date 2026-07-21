import { SET_SEARCHING } from '../../action';

const initialState = {
    isSearching: false
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_SEARCHING:
            return {
                ...state,
                isSearching: action.isSearching
            };
        default:
            return state;
    }
};

export default reducer;
