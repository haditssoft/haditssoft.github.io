import { SWITCHNOTEMODE } from '../../action';

const initialState = {
    noteMode: 'create',
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case SWITCHNOTEMODE:
            return {
                noteMode: action.mode,
            };
        default:
            return state;
    };
};

export default reducer;