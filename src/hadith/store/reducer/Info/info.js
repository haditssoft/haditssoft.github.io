import { OPENINFO, TEXTINFO, CONTENTINFO } from '../../action';

const initialState = {
    openInfo: false,
    textInfo: '',
    contentInfo: null
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case OPENINFO:
            return {
                ...state,
                openInfo: action.open
            };
        case TEXTINFO:
            return {
                ...state,
                textInfo: action.text
            };
        case CONTENTINFO:
            return {
                ...state,
                contentInfo: action.value
            };
        default:
            return state;
    };
};

export default reducer;