import { OPENSNACKBARS, PUSHTOQUEUE } from "../action";

const initialState = {
    queueSnackBar: [],
    openSnackBar: false,
    messageSnackBar: {}
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case OPENSNACKBARS:
            return {
                ...state,
                openSnackBar: action.show,
                messageSnackBar: action.message
            };
        case PUSHTOQUEUE:
            return {
                ...state,
                queueSnackBar: action.queue
            };
        default:
            return state;
    };
};

export default reducer;