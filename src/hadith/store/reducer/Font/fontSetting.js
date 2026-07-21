import { SETALLFONT, SETARABICFONT, SETINDOFONT } from '../../action';

const initialState = {
    arabicFont: ['Noto Naskh Arabic', 'serif', 400, 27], // ['fontName', type, fontWeight, fontSize]
    indoFont: ['Roboto', 'san-serif', 400, 16]
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case SETALLFONT:
            return {
                arabicFont: action.aFont,
                indoFont: action.iFont
            };
        case SETARABICFONT:
            return {
                ...state,
                arabicFont: action.aFont
            };
        case SETINDOFONT:
            return {
                ...state,
                indoFont: action.iFont
            };
        default:
            return state;
    };
};

export default reducer;