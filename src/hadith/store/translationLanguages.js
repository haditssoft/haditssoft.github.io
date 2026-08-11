export const translationLanguages = ['Indonesia', 'English', 'Urdu', 'Bengali'];

export const isValidTranslationLang = lang => translationLanguages.indexOf(lang) !== -1;

// Resolve the chosen translation text with safe fallback to Indonesia.
// mainData: a hadith row object with Indonesia/English/Urdu/Bengali fields.
// Returns { lang, text } where lang is the language the returned text actually belongs to.
export const resolveTranslation = (mainData, storedLang) => {
    const lang = isValidTranslationLang(storedLang) ? storedLang : 'Indonesia';
    const chosen = mainData[lang];
    const text = (chosen && chosen.trim()) ? chosen : (mainData.Indonesia || '');
    return {
        lang: text === (mainData.Indonesia || '') ? 'Indonesia' : lang,
        text: text
    };
};
