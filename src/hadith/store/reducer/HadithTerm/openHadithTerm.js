import { HADITHTERM } from '../../action';

const initialState = {
    showHadithTerm: false
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case HADITHTERM:
            return {
                showHadithTerm: action.open
            };
        default:
            return state;
    };
};

export default reducer;