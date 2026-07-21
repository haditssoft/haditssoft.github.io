import { ALLNOTESDATA } from '../../action';

const initialState = {
    allNotes: [],
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case ALLNOTESDATA:
            return {
                allNotes: action.note,
            };
        default:
            return state;
    };
};

export default reducer;