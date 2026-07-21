import { TABBODYHEIGHTREF } from '../../action';

// the name of these whole reducer's things should be changed
// because it doesn't represent the type of value its hold

const initialState = {
    tabBodyHeight: 0, // actually this is contains DOM ref of tab body
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case TABBODYHEIGHTREF:
            return {
                ...state,
                tabBodyHeight: action.height
            };
        default:
            return state;
    };
};

export default reducer;