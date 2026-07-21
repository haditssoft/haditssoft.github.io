import { SEARCHVALUE } from '../../action';

const initialState = {
    searchValue: ''
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case SEARCHVALUE:
            return {
                searchValue: action.value
            };
        default:
            return state;
    };
};

export default reducer;