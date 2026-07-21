import { DIALOGPROFILERAWI } from '../../action';

const initialState = {
    // it was boolean default to false then changed to empty string
    // because the dialog is used by detailsColor too.
    showDialogProfileRawi: ''
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case DIALOGPROFILERAWI:
            return {
                showDialogProfileRawi: action.show
            };
        default:
            return state;
    };
};

export default reducer;