import i18n from "i18next";
import { CHANGE_LANGUAGE, LanguageActionTypes } from './languageActions';

export interface LanguageState {
    language: "zh" | "en",
    languageList: {name: string, code: string}[]
}

const defaultLanguageState: LanguageState = {
    language: "zh",
    languageList: [
        {
            name: "中文",
            code: "zh"
        },
        {
            name: "English",
            code: "en"
        }
    ]
}

const languageReducer = (state = defaultLanguageState, action: LanguageActionTypes) => {
    // if (action.type === 'change_language') {
    //     const newState = { ...state, language: action.payload };
    //     return newState;
    // };
    // return state;
    switch (action.type) {
        case CHANGE_LANGUAGE: 
            i18n.changeLanguage(action.payload);
            return { ...state, language: action.payload };
        default: 
            return state;
    };
}

export default languageReducer;
