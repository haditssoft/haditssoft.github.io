import * as actionTypes from '../../action';

const initialState = {
    amountTotal: '',
    amountBukhari: '',
    amountMuslim: '',
    amountTirmidzi: '',
    amountAbuDaud: '',
    amountNasai: '',
    amountIbnuMajah: '',
    amountDarimi: '',
    amountAhmad: '',
    amountMalik: '',
    amountDaruquthni: '',
    amountIbnuKhuzaimah: '',
    amountIbnuHibban: '',
    amountAlMustadrak: '',
    amountSyafii: ''
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.AMOUNTBUKHARI:
            return {
                ...state,
                amountTotal: action.total,
                amountBukhari: action.amount
            };
        case actionTypes.AMOUNTMUSLIM:
            return {
                ...state,
                amountTotal: action.total,
                amountMuslim: action.amount
            };
        case actionTypes.AMOUNTTIRMIDZI:
            return {
                ...state,
                amountTotal: action.total,
                amountTirmidzi: action.amount
            };
        case actionTypes.AMOUNTABUDAUD:
            return {
                ...state,
                amountTotal: action.total,
                amountAbuDaud: action.amount
            };
        case actionTypes.AMOUNTNASAI:
            return {
                ...state,
                amountTotal: action.total,
                amountNasai: action.amount
            };
        case actionTypes.AMOUNTIBNUMAJAH:
            return {
                ...state,
                amountTotal: action.total,
                amountIbnuMajah: action.amount
            };
        case actionTypes.AMOUNTDARIMI:
            return {
                ...state,
                amountTotal: action.total,
                amountDarimi: action.amount
            };
        case actionTypes.AMOUNTAHMAD:
            return {
                ...state,
                amountTotal: action.total,
                amountAhmad: action.amount
            };
        case actionTypes.AMOUNTMALIK:
            return {
                ...state,
                amountTotal: action.total,
                amountMalik: action.amount
            };
        case actionTypes.AMOUNTDARUQUTHNI:
            return {
                ...state,
                amountTotal: action.total,
                amountDaruquthni: action.amount
            };
        case actionTypes.AMOUNTIBNUKHUZAIMAH:
            return {
                ...state,
                amountTotal: action.total,
                amountIbnuKhuzaimah: action.amount
            };
        case actionTypes.AMOUNTIBNUHIBBAN:
            return {
                ...state,
                amountTotal: action.total,
                amountIbnuHibban: action.amount
            };
        case actionTypes.AMOUNTALMUSTADRAK:
            return {
                ...state,
                amountTotal: action.total,
                amountAlMustadrak: action.amount
            };
        case actionTypes.AMOUNTSYAFII:
            return {
                ...state,
                amountTotal: action.total,
                amountSyafii: action.amount
            };
        case actionTypes.CLEARAMOUNT:
            return {
                amountTotal: '',
                amountBukhari: '',
                amountMuslim: '',
                amountTirmidzi: '',
                amountAbuDaud: '',
                amountNasai: '',
                amountIbnuMajah: '',
                amountDarimi: '',
                amountAhmad: '',
                amountMalik: '',
                amountDaruquthni: '',
                amountIbnuKhuzaimah: '',
                amountIbnuHibban: '',
                amountAlMustadrak: '',
                amountSyafii: ''
            };
        default:
            return state;
    };
};

export default reducer;