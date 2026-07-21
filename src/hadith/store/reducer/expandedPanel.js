import * as actionTypes from "../action";

const initialState = {
    expandKedudukan: null,
    expandTema: null
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.EXPANDCOLLAPSE:
            return {
                expandKedudukan: action.nameOrfalse[0],
                expandTema: action.nameOrfalse[1]
            };
        default:
            return state;
    };
};

export default reducer;