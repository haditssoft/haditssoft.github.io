import { UNBOOKMARK } from '../../action';

const initialState = {
    unBookmark: []
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case UNBOOKMARK:
            return {
                unBookmark: action.delete
            };
        default:
            return state;
    };
};

export default reducer;