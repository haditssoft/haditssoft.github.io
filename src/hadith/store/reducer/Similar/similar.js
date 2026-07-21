import { SIMILARDATA, SELECTEDSIMILAR } from '../../action';

const initialState = {
    similarData: [],
    selectedSimilar: '',
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case SIMILARDATA:
            return {
                ...state,
                similarData: action.data || []
            };
        case SELECTEDSIMILAR:
            return {
                ...state,
                selectedSimilar: action.select
            };
        default:
            return state;
    };
};

export default reducer;