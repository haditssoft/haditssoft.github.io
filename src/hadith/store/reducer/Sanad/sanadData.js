import { SANADDATA } from '../../action';

const initialState = {
    narrators: []
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case SANADDATA:
            return {
                narrators: action.data || []
            };
        default:
            return state;
    };
};

export default reducer;