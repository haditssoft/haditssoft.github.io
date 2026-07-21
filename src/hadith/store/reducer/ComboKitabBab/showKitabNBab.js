import { KITABANDBAB } from '../../action';

const initialState = {
    isVisible: true
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case KITABANDBAB:
            return {
                isVisible: action.show
            };
        default:
            return state;
    };
};

export default reducer;