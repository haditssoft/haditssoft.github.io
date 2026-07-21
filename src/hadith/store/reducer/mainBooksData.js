import {
    MAINBOOKSDATA,
    CLASSIFICATIONDATA,
    CLEARMAINDATA,
    CHANGENUMBER,
    TOTALROW
} from "../action";


const initialState = {
    KitabName: '',
    Nomer: '',
    Arabic: '',
    Gundul: '',
    Indonesia: '',
    Derajat1: '',
    Derajat2: '',
    VSelectedK: '',
    VSelectedB: '',
    WhatDataIsShown: '',
    TotalRow: '',
    Position: '',
    changePosition: ''
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case MAINBOOKSDATA:
            // const newState = Object.assign({}, state);
            // newState = action.val;
            // return newState;
            return {
                ...state,
                KitabName: action.result[0].KitabName,
                Nomer: action.result[0].Nomer,
                Arabic: action.result[0].Arabic,
                Gundul: action.result[0].Gundul,
                Indonesia: action.result[0].Indonesia,
                Derajat1: action.result[0].Albani,
                Derajat2: action.result[0].Darussalam,
                VSelectedK: action.result[0].VSelectedK,
                VSelectedB: action.result[0].VSelectedB,
                WhatDataIsShown: action.dataType,
                Position: action.result[0].Nomer,
                changePosition: action.result[0].Nomer
            };
        case CLASSIFICATIONDATA:
            return {
                ...state,
                KitabName: action.result[0].KitabName,
                Nomer: action.result[0].Nomer,
                Arabic: action.result[0].Arabic,
                Gundul: action.result[0].Gundul,
                Indonesia: action.result[0].Indonesia,
                Derajat1: action.result[0].Albani,
                Derajat2: action.result[0].Darussalam,
                VSelectedK: action.result[0].VSelectedK,
                VSelectedB: action.result[0].VSelectedB,
                WhatDataIsShown: action.dataType,
                Position: action.pos,
                changePosition: action.pos
            };
        case CLEARMAINDATA:
            return {
                KitabName: '',
                Nomer: '',
                Arabic: '',
                Gundul: '',
                Indonesia: '',
                Derajat1: '',
                Derajat2: '',
                VSelectedK: '',
                VSelectedB: '',
                WhatDataIsShown: '',
                TotalRow: '',
                Position: '',
                changePosition: ''
            };
        case CHANGENUMBER:
            return {
                ...state,
                changePosition: action.position
            };
        case TOTALROW:
            return {
                ...state,
                TotalRow: action.totalRow
            };
        default:
            return state;
    }
};

export default reducer;