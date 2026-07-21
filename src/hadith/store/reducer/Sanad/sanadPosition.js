import { SANADPOSITION } from '../../action';

const initialState = {
    sanadPos: 0
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case SANADPOSITION:
            return {
                sanadPos: action.pos
            };
        default:
            return state;
    };
};

export default reducer;