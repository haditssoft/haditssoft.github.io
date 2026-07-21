import { BOOKMARKLIST } from '../action';

const initialState = {
    bookmarkList: []
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case BOOKMARKLIST:
            return {
                bookmarkList: action.value
            };
        default:
            return state;
    };
};

export default reducer;