import { NEWTITLE, EXISTTITLE, TITLEFORLOAD, STORELISTTITLE } from '../action';

const initialState = {
    titleForLoad: '',
    newTitle: '',
    existTitle: '',
    listTitle: []
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case NEWTITLE:
            return {
                ...state,
                newTitle: action.value
            };
        case EXISTTITLE:
            return {
                ...state,
                existTitle: action.value
            };
        case TITLEFORLOAD:
            return {
                ...state,
                titleForLoad: action.value
            };
        case STORELISTTITLE:
            return {
                ...state,
                listTitle: action.arrayList
            };
        default:
            return state;
    };
};

export default reducer;