import { TABDIALOG } from '../../action';

const initialState = {
    showTabDialog: false,
    whichTab: 'left'
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case TABDIALOG:
            return {
                showTabDialog: action.show,
                whichTab: action.side
            };
        default:
            return state;
    };
};

export default reducer;