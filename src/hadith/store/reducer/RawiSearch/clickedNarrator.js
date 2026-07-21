import { CLICKEDNARRATOR, ISNARRATORSELECTED } from '../../action';

const initialState = {
    narrator: [],
    isSelected: null,
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case CLICKEDNARRATOR:
            return {
                ...state,
                narrator: action.data
            };
        case ISNARRATORSELECTED:
            return {
                ...state,
                isSelected: action.selected
            };
        default:
            return state;
    };
};

export default reducer;