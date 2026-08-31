import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import id from './hadith/locales/id.json';
import en from './hadith/locales/en.json';
import ur from './hadith/locales/ur.json';
import bn from './hadith/locales/bn.json';

export const langMap = { 'Indonesia': 'id', 'English': 'en', 'Urdu': 'ur', 'Bengali': 'bn' };
export const reverseLangMap = { 'id': 'Indonesia', 'en': 'English', 'ur': 'Urdu', 'bn': 'Bengali' };

const getInitialLang = () => {
  const stored = localStorage.getItem('translation_lang');
  return langMap[stored] || 'id';
};

i18n
  .use(initReactI18next)
  .init({
    resources: {
      id: { translation: id },
      en: { translation: en },
      ur: { translation: ur },
      bn: { translation: bn }
    },
    lng: getInitialLang(),
    fallbackLng: 'id',
    interpolation: {
      escapeValue: false
    }
  });

export const syncI18nWithRedux = (store) => {
  store.subscribe(() => {
    const state = store.getState();
    const reduxLang = state.translationLang.language;
    const i18nLang = langMap[reduxLang] || 'id';
    if (i18n.language !== i18nLang) {
      i18n.changeLanguage(i18nLang);
    }
  });
};

export default i18n;
