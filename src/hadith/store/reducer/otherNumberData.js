import * as actionTypes from "../action";

const initialState = {
    // noLain is hold an array type of data
    // which is contains an object
    noLain: [],
    showInput: false,
    numberToSearch: ''
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.OTHERNUMBER:
            return {
                ...state,
                noLain: action.noLain
            };
        case actionTypes.CLEAROTHERNUMBER:
            return {
                ...state,
                noLain: []
            };
        case actionTypes.SHOWINPUTOTHERNUMBER:
            return {
                ...state,
                showInput: action.show,
                numberToSearch: ''
            };
        case actionTypes.OTHERNUMBERTOSEARCH:
            return {
                ...state,
                numberToSearch: action.position
            };
        default:
            return state;
    };
};

export default reducer;