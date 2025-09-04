import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import {
  LOCALE_LIST,
  DEFAULT_LOCALE,
  LANGUAGE_NAME_LOCAL_STORAGE,
} from "../constants/statics";

import en from "../../assets/locales/en.json";
import fa from "../../assets/locales/fa.json";

const currentLng = localStorage.getItem(LANGUAGE_NAME_LOCAL_STORAGE);

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    resources: {
      en: {
        translation: en,
      },
      fa: {
        translation: fa,
      },
    },
    lng:
      currentLng && LOCALE_LIST.includes(currentLng as TLanguages)
        ? currentLng
        : DEFAULT_LOCALE,
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
