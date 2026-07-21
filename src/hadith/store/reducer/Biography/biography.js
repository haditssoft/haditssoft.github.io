import { OPENBIOGRAPHY, TEXTBIOGRAPHY } from '../../action';

const initialState = {
    openBiography: false,
    imamName: '',
    textBiography: ''
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case OPENBIOGRAPHY:
            return {
                ...state,
                openBiography: action.open
            };
        case TEXTBIOGRAPHY:
            return {
                ...state,
                imamName: action.imam,
                textBiography: action.text
            };
        default:
            return state;
    };
};

export default reducer;