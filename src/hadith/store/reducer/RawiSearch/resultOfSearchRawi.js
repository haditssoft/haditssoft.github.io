import { SEARCHRAWIRESULT } from '../../action';

const initialState = {
    resultRawi: null, // null is just so that it can be identified as initial load, then it will be stored with array
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case SEARCHRAWIRESULT:
            return {
                resultRawi: action.value
            };
        default:
            return state;
    };
};

export default reducer;