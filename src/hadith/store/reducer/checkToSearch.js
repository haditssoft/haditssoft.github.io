import * as actionTypes from '../action';

const initialState = {
    checkAll: true,
    checkBukhari: true,
    checkMuslim: true,
    checkTirmidzi: true,
    checkAbuDaud: true,
    checkNasai: true,
    checkIbnuMajah: true,
    checkDarimi: true,
    checkAhmad: true,
    checkMalik: true,
    checkDaruquthni: true,
    checkIbnuKhuzaimah: true,
    checkIbnuHibban: true,
    checkAlMustadrak: true,
    checkSyafii: true
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.CHECKALL:
            return {
                checkAll: action.checked,
                checkBukhari: action.checked,
                checkMuslim: action.checked,
                checkTirmidzi: action.checked,
                checkAbuDaud: action.checked,
                checkNasai: action.checked,
                checkIbnuMajah: action.checked,
                checkDarimi: action.checked,
                checkAhmad: action.checked,
                checkMalik: action.checked,
                checkDaruquthni: action.checked,
                checkIbnuKhuzaimah: action.checked,
                checkIbnuHibban: action.checked,
                checkAlMustadrak: action.checked,
                checkSyafii: action.checked
            };
        case actionTypes.CHECKALLNOT:
            return {
                ...state,
                checkAll: action.checked
            };
        case actionTypes.CHECKBUKHARI:
            return {
                ...state,
                checkBukhari: action.checked
            };
        case actionTypes.CHECKMUSLIM:
            return {
                ...state,
                checkMuslim: action.checked
            };
        case actionTypes.CHECKTIRMIDZI:
            return {
                ...state,
                checkTirmidzi: action.checked
            };
        case actionTypes.CHECKABUDAUD:
            return {
                ...state,
                checkAbuDaud: action.checked
            };
        case actionTypes.CHECKNASAI:
            return {
                ...state,
                checkNasai: action.checked
            };
        case actionTypes.CHECKIBNUMAJAH:
            return {
                ...state,
                checkIbnuMajah: action.checked
            };
        case actionTypes.CHECKDARIMI:
            return {
                ...state,
                checkDarimi: action.checked
            };
        case actionTypes.CHECKAHMAD:
            return {
                ...state,
                checkAhmad: action.checked
            };
        case actionTypes.CHECKMALIK:
            return {
                ...state,
                checkMalik: action.checked
            };
        case actionTypes.CHECKDARUQUTHNI:
            return {
                ...state,
                checkDaruquthni: action.checked
            };
        case actionTypes.CHECKIBNUKHUZAIMAH:
            return {
                ...state,
                checkIbnuKhuzaimah: action.checked
            };
        case actionTypes.CHECKIBNUHIBBAN:
            return {
                ...state,
                checkIbnuHibban: action.checked
            };
        case actionTypes.CHECKALMUSTADRAK:
            return {
                ...state,
                checkAlMustadrak: action.checked
            };
        case actionTypes.CHECKSYAFII:
            return {
                ...state,
                checkSyafii: action.checked
            };
        default:
            return state;
    };
};

export default reducer;