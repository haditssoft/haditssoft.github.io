import * as actionTypes from "../action";

const initialState = {
    bukhari: '',
    muslim: '',
    tirmidzi: '',
    abuDaud: '',
    nasai: '',
    ibnuMajah: '',
    darimi: '',
    ahmad: '',
    malik: ''
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.NUMBEREACHBOOKS:
            return {
                bukhari: action.arrayOfNumber[0],
                muslim: action.arrayOfNumber[1],
                tirmidzi: action.arrayOfNumber[2],
                abuDaud: action.arrayOfNumber[3],
                nasai: action.arrayOfNumber[4],
                ibnuMajah: action.arrayOfNumber[5],
                darimi: action.arrayOfNumber[6],
                ahmad: action.arrayOfNumber[7],
                malik: action.arrayOfNumber[8]
            };
        default:
            return state;
    };
};

export default reducer;