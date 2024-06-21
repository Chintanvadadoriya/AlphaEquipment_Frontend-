import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
//
import en from "./locales/en.js";
import es from "./locales/es.js";
// import frLocales from "./fr.json";
// import zhLocales from "./zh.json";

// ----------------------------------------------------------------------
const lang =
  typeof window !== "undefined" && localStorage.getItem("i18nextLng");

const options = {
  order: ["navigator"],
  // lookupQuerystring: 'lng',
};
  
i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translations: en },
      es: { translations: es },
      // fr: { translations: frLocales },
      // zh: { translations: zhLocales },
    },
    detection: options,
    supportedLngs: ["en", "it"],
    lng: "en",

    // we init with resources
    fallbackLng: "en",
    debug: false,

    // have a common namespace used around the full app
    ns: ["translations"],
    defaultNS: "translations",

    keySeparator: false, // we use content as keys

    interpolation: {
      escapeValue: false,
    },
  });

i18n.fallbacks = true;

i18n.translations = {
  es,
  en,
  // it,
  // de,
  // fr,
  // nl,
};

export default i18n;
