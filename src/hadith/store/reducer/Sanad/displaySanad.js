import { SHOWSANAD } from '../../action';

const initialState = {
    showSanad: false
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case SHOWSANAD:
            return {
                showSanad: action.show
            };
        default:
            return state;
    };
};

export default reducer;