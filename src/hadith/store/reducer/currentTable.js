import { CURRENTTABLE } from "../action";

const initialState = {
    shownTable: ''
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case CURRENTTABLE:
            return {
                shownTable: action.currentTable
            };
        default:
            return state;
    };
};

export default reducer;