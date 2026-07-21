import { GLOBALTHEME } from '../../action';

const initialState = {
    globalTheme: {
        overrides: {
            MuiIconButton: {
                root: {
                    color: 'inherit'
                }
            }
        }
    }
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case GLOBALTHEME:
            return {
                globalTheme: action.theme
            };
        default:
            return state;
    };
};

export default reducer;