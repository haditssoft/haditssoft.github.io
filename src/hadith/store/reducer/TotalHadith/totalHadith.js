import { NARRATORNAME, TOTALHADITHDATA } from '../../action';

const initialState = {
    narratorName: '',
    totalNarrated: []
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case NARRATORNAME:
            return {
                ...state,
                narratorName: action.name
            };
        case TOTALHADITHDATA:
            return {
                ...state,
                totalNarrated: action.value || []
            };
        default:
            return state;
    };
};

export default reducer;