import { TRIGGERRENDERRAWIRESULT } from '../../action';

const initialState = {
    reRenderRawiResult: 1, // change everytime window resize
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case TRIGGERRENDERRAWIRESULT:
            return {
                reRenderRawiResult: action.value
            };
        default:
            return state;
    };
};

export default reducer;