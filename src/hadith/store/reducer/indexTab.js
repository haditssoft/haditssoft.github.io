import { INDEXLEFTTAB, INDEXRIGHTTAB } from "../action";

const initialState = {
    leftTab: 0,
    rightTab: 0
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case INDEXLEFTTAB:
            return {
                ...state,
                leftTab: action.index
            };
        case INDEXRIGHTTAB:
            return {
                ...state,
                rightTab: action.index
            };
        default:
            return state;
    };
};

export default reducer;