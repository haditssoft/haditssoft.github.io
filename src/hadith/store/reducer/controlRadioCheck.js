import { RADIOCHECKED, RADIOMODECARICHECKED, SEARCHENDPOINTMODE } from "../action";

const initialState = {
    radioBookmark: 0,
    radioModeCari: 1, // default nya multi kata kunci
    radioSearchEndpoint: 1 // 0 = per-book, 1 = all-books (default)
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case RADIOCHECKED:
            return {
                ...state,
                radioBookmark: action.checked
            };
        case RADIOMODECARICHECKED:
            return {
                ...state,
                radioModeCari: action.checked
            };
        case SEARCHENDPOINTMODE:
            return {
                ...state,
                radioSearchEndpoint: action.checked
            };
        default:
            return state;
    };
};

export default reducer;