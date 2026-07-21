import { SHOWDIAGRAMSANAD } from '../../action';

const initialState = {
    openDiagramSanad: false
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case SHOWDIAGRAMSANAD:
            return {
                openDiagramSanad: action.open
            };
        default:
            return state;
    };
};

export default reducer;