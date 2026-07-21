import { SHOWPROFILE, RESIZEBOUND, SELECTEDRAWI, SCHOLARCOMMENT } from '../../action';

const initialState = {
    openProfile: false,
    resizeBound: null,
    selectedRawi: '',
    scholarComment: []
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case SHOWPROFILE:
            return {
                ...state,
                openProfile: action.open
            };
        case RESIZEBOUND:
            return {
                ...state,
                resizeBound: action.bound
            };
        case SELECTEDRAWI:
            return {
                ...state,
                selectedRawi: action.selected
            };
        case SCHOLARCOMMENT:
            return {
                ...state,
                scholarComment: action.comment || []
            };
        default:
            return state;
    };
};

export default reducer;