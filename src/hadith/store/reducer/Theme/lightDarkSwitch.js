import { LIGHTDARKSWITCH } from '../../action';

const initialState = {
    isDark: undefined // let it be undefined for comparison in useEffect so that useEffect wont messing around
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case LIGHTDARKSWITCH:
            return {
                isDark: action.dark
            };
        default:
            return state;
    };
};

export default reducer;