import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import translationEN from "./local/en.json";
import translationAR from "./local/ar.json";
import LanuageDector from "i18next-browser-languagedetector"

const resources = {
  en: {
    translation: translationEN
  },
  ar: {
    translation: translationAR
  }
};

i18n
  .use(LanuageDector)
  .use(initReactI18next)
  .init({
    resources,
    lng: "ar", 
    interpolation: {
      escapeValue: false
    },
    react:{
        useSuspense:false
    }
  });

export default i18n;
