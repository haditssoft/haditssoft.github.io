import { NAMEVALUE, KUNYAHVALUE, KALANGANVALUE, LEVELVALUE } from '../../action';

const initialState = {
    nameValue: '',
    kunyahValue: '',
    kalanganValue: '',
    levelValue: '',
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case NAMEVALUE:
            return {
                ...state,
                nameValue: action.name
            };
        case KUNYAHVALUE:
            return {
                ...state,
                kunyahValue: action.kunyah
            };
        case KALANGANVALUE:
            return {
                ...state,
                kalanganValue: action.kalangan
            };
        case LEVELVALUE:
            return {
                ...state,
                levelValue: action.level
            };
        default:
            return state;
    };
};

export default reducer;