import { SHOWNKITABVALUE, SHOWNBABVALUE} from "../action";

const initialState = {
    ShownKitab: '',
    ShownBab: ''
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case SHOWNKITABVALUE:
            return {
                ...state,
                ShownKitab: action.value
            };
        case SHOWNBABVALUE:
            return {
                ...state,
                ShownBab: action.value
            };
        default:
            return state;
    }
};

export default reducer;