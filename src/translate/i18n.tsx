import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import viTransition from "./translatesion/vi.json";
import enTransition from "./translatesion/en.json";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    debug: true,
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
    resources: {
      vi: {
        translation: viTransition,
      },
      en: {
        translation: enTransition,
      },
    },
  });

export default i18n;
