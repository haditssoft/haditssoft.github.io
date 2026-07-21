import { NOTEVALUE, ANCHORNOTE, SHOWNOTE, NOTEEXIST, LOGIN_STATE } from '../../action';

const initialState = {
    noteValue: '',
    anchorNote: null,
    openNote: false,
    noteExist: false
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case NOTEVALUE:
            return {
                ...state,
                noteValue: action.value,
            };
        case ANCHORNOTE:
            return {
                ...state,
                anchorNote: action.target,
            };
        case SHOWNOTE:
            return {
                ...state,
                openNote: action.open
            };
        case NOTEEXIST:
            return {
                ...state,
                noteExist: action.exist
            };
        case LOGIN_STATE:
            return {
                ...state,
                noteValue: '',
                openNote: false,
                noteExist: false,
            };
        default:
            return state;
    };
};

export default reducer;