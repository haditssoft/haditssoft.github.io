import { SETTRANSLATIONLANG } from "../action";
import { isValidTranslationLang } from "../translationLanguages";

const initialState = {
    language: isValidTranslationLang(localStorage.getItem('translation_lang')) ? localStorage.getItem('translation_lang') : 'Indonesia'
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case SETTRANSLATIONLANG:
            if (isValidTranslationLang(action.language)) {
                localStorage.setItem('translation_lang', action.language);
            }
            return {
                ...state,
                language: action.language
            };
        default:
            return state;
    }
};

export default reducer;
