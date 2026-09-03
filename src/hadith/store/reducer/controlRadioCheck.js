import { RADIOCHECKED } from "../action";

const initialState = {
    radioBookmark: 0
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case RADIOCHECKED:
            return {
                ...state,
                radioBookmark: action.checked
            };
        default:
            return state;
    };
};

export default reducer;