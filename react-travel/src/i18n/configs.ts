import i18n from "i18next";
import { initReactI18next } from 'react-i18next';

import translation_zh from './zh.json';
import translation_en from './en.json';

const resources = {
    zh: {
        translation: translation_zh
    },
    en: {
        translation: translation_en
    }
}

i18n.use(initReactI18next).init({
    resources,
    lng: 'zh',
    interpolation: {
        escapeValue: false
    }
});

export default i18n;
