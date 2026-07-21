import { ANCHORDETAILSCOLOR, SHOWDETAILSCOLOR, SELECTEDEXPLANATION, EXPLANATIONCOLOR } from '../../action';

const initialState = {
    anchorDetailsColor: null,
    openDetailsColor: false,
    selectedExplanation: 0,
    explanationColor: '',
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case ANCHORDETAILSCOLOR:
            return {
                ...state,
                anchorDetailsColor: action.target,
            };
        case SHOWDETAILSCOLOR:
            return {
                ...state,
                openDetailsColor: action.open
            };
        case SELECTEDEXPLANATION:
            return {
                ...state,
                selectedExplanation: action.value
            };
        case EXPLANATIONCOLOR:
            return {
                ...state,
                explanationColor: action.value
            };
        default:
            return state;
    };
};

export default reducer;