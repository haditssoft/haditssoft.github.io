import { SHOWSIMILAR } from '../../action';

const initialState = {
    showSimilar: false
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case SHOWSIMILAR:
            return {
                showSimilar: action.show
            };
        default:
            return state;
    };
};

export default reducer;