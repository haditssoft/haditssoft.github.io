import { BOOKMARKTABLE } from '../../action';

const initialState = {
    tableBookmark: {}
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case BOOKMARKTABLE:
            return {
                tableBookmark: action.value
            };
        default:
            return state;
    };
};

export default reducer;