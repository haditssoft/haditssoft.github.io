import { HADITHBEFORESIMILAR } from '../../action';

const initialState = {
    hadithBeforeSimilar: null,
    dataBeforeSimilar: '',
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case HADITHBEFORESIMILAR:
            return {
                hadithBeforeSimilar: action.hadith,
                dataBeforeSimilar: action.data
            };
        default:
            return state;
    };
};

export default reducer;